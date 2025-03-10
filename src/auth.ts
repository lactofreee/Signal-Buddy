import NextAuth, { CredentialsSignin, JWT } from "next-auth";
import Kakao from "next-auth/providers/kakao";
import Naver from "next-auth/providers/naver";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { login, refresh } from "./services/auth.service";
import { cookies } from "next/headers";
import server from "./lib/api/server";
import { AxiosResponse } from "axios";

class InvalidLoginError extends CredentialsSignin {
  code = "해당 사용자를 찾을 수 없습니다.";
}

const tokenConvert = async (response: AxiosResponse) => {
  const token = response.headers["authorization"];
  const resCookies = response.headers["set-cookie"];
  const refreshToken = resCookies ? resCookies[0] : "";
  const accessTokenExpires = Math.floor(Date.now() / 1000) + 60 * 60;

  return { token, refreshToken, accessTokenExpires };
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        id: { label: "id" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;
        const { id, password } = credentials;

        const response = await login({
          id: id as string,
          password: password as string,
        });
        if (response.data.status === "오류") {
          throw new InvalidLoginError();
        }
        const user = response.data;
        const tokens = await tokenConvert(response);
        return { ...user.data, ...tokens };
      },
    }),
    Kakao({
      clientId: process.env.AUTH_KAKAO_CLIENT_ID || "",
      clientSecret: process.env.AUTH_KAKAO_CLIENT_SECRET || "",
    }),
    Naver({
      clientId: process.env.AUTH_NAVER_CLIENT_ID || "",
      clientSecret: process.env.AUTH_NAVER_CLIENT_SECRET || "",
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt", // JSON Web Token 사용
    maxAge: 60 * 60 * 24, // 세션 만료 시간(sec)
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    signIn: async ({ account, profile, user }) => {
      if (account && account.provider !== "credentials" && profile) {
        const body = {
          provider: account.provider,
          socialUserId: account.providerAccountId,
        };
        const res = await server.post("/api/auth/social-login", body);
        const data = res.data;
        if (data.status === "성공") {
          const { token, refreshToken, accessTokenExpires } =
            await tokenConvert(res);
          user.memberId = data.data.memberId;
          user.nickname = data.data.nickname;
          user.profileImageUrl = data.data.profileImageUrl;
          user.email = data.data.email;
          user.role = data.data.role;
          user.token = token;
          user.refreshToken = refreshToken;
          user.accessTokenExpires = accessTokenExpires;

          return true;
        } else {
          const params = new URLSearchParams();
          params.set("provider", account.provider);
          params.set("id", account.providerAccountId);
          if (account.provider === "naver") {
            if (profile.response.nickname)
              params.set("nickname", profile.response.nickname);
            if (profile.response.email)
              params.set("email", profile.response.email);
          }
          if (account.provider === "kakao") {
            if (profile.kakao_account.profile.nickname)
              params.set("nickname", profile.kakao_account.profile.nickname);
            if (profile.kakao_account.email)
              params.set("email", profile.kakao_account.email);
          }
          if (account.provider === "google") {
            if (profile.name) params.set("nickname", profile.name);
            if (profile.email) params.set("email", profile.email);
          }

          return `/join?${params.toString()}`;
        }
      }
      return true;
    },
    jwt: async ({ token, user, account, trigger, session }) => {
      if (user && account) {
        return { ...token, ...user };
      } else if (trigger === "update" && session) {
        const { nickname, profileImageUrl } = session;
        return { ...token, nickname, profileImageUrl };
      } else if (
        Date.now() <
        (token.accessTokenExpires as number) * 1000 - 10 * 60 * 1000
      ) {
        console.log(
          Math.floor(Date.now() / 1000) -
            Math.floor(
              ((token.accessTokenExpires as number) * 1000 - 10 * 60 * 1000) /
                1000,
            ),
        );
        return token;
      }
      if (!token.token) throw new TypeError("Missing accessTokenExpires");
      if (!token.refreshToken) throw new TypeError("Missing refresh_token");
      try {
        console.log("request headers", {
          Authorization: token.token as string,
          Cookie: token.refreshToken as string,
        });
        const response = await fetch(
          `${process.env.API_BASE_URL}/api/auth/reissue`,
          {
            method: "POST",
            headers: {
              Authorization: token.token as string,
              Cookie: token.refreshToken as string,
            },
          },
        );
        const tokensOrError = await response.json();
        console.log("data", tokensOrError);
        if (!response.ok) {
          console.error(response.status, "REFRESH ERROR");
          token.error = "RefreshTokenError";
          return token;
        }
        const newToken = response.headers.get("authorization");
        const resCookies = response.headers.get("set-cookie")?.split(", ");
        const refreshToken =
          resCookies?.find((cookie) => cookie.startsWith("refreshToken=")) ||
          "";

        console.log("newToken", newToken, resCookies);
        if (!newToken || !refreshToken) {
          token.error = "RefreshTokenError";
          return token;
        }

        return {
          ...token,
          accessTokenExpires: Math.floor(Date.now() / 1000) + 60 * 60,
          token: newToken,
          refreshToken,
        };
      } catch (err) {
        console.error("Error refreshing access_token", err);
        token.error = "RefreshTokenError";
        return token;
      }
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.memberId = token.memberId as number;
        session.user.nickname = token.nickname as string;
        session.user.profileImageUrl = token.profileImageUrl as string;
        session.user.email = token.email as string;
        session.user.role = token.role as "USER" | "ADMIN";
        session.user.token = token.token as string;
        session.user.refreshToken = token.refreshToken as string;
        session.user.accessTokenExpires = token.accessTokenExpires as number;
      }
      return session;
    },
  },
});
