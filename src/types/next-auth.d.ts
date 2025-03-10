import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      memberId: number;
      nickname: string;
      profileImageUrl?: string;
      email: string;
      role: "USER" | "ADMIN";
      token: string;
      refreshToken: string;
      accessTokenExpires: number;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    memberId: number;
    nickname: string;
    profileImageUrl?: string;
    email: string;
    role: "USER" | "ADMIN";
    token: string;
    refreshToken: string;
    accessTokenExpires: number;
  }

  interface JWT {
    id: string;
    memberId: number;
    nickname: string;
    profileImageUrl?: string;
    email: string;
    role: "USER" | "ADMIN";
    token: string;
    refreshToken: string;
    accessTokenExpires: number;
  }

  interface Profile {
    response: {
      nickname: string;
      email: string;
    };
    kakao_account: {
      profile: {
        nickname: string;
      };
      email: string;
    };
  }
}
