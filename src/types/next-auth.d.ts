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
