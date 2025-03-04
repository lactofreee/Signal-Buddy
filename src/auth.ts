import NextAuth, { CredentialsSignin } from "next-auth";
import Kakao from "next-auth/providers/kakao";
import Credentials from "next-auth/providers/credentials";
import { login } from "./services/auth.service";
import { cookies } from "next/headers";

class InvalidLoginError extends CredentialsSignin {
  code = "사용자를 찾을 수 없습니다.";
}

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

        if (response.status === 404) {
          throw new InvalidLoginError();
        }

        const token = response.headers["authorization"];
        const resCookies = response.headers["set-cookie"];
        const user = response.data;
        const refreshToken = resCookies ? resCookies[0] : "";
        const cookieStore = await cookies();
        const match = refreshToken.match(/refresh-token=([^;]+)/);
        cookieStore.set({
          name: "refresh-token",
          value: match ? decodeURIComponent(match[1]) : refreshToken,
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 60 * 60 * 24 * 7,
        });
        return { ...user.data, token, refreshToken };
      },
    }),
    Kakao({
      clientId: process.env.AUTH_KAKAO_CLIENT_ID || "",
      clientSecret: process.env.AUTH_KAKAO_CLIENT_SECRET || "",
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
    signIn: async () => {
      return true;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token = { ...token, ...user };
      }
      return token;
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
      }
      return session;
    },
  },
});
