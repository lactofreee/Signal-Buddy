import { signIn } from "next-auth/react";

export const login = async (id: string, password: string) => {
  return await signIn("credentials", {
    id,
    password,
    redirect: false,
  });
};

export const naverLogin = () => signIn("naver");
export const kakaoLogin = () => signIn("kakao");
export const googleLogin = () => signIn("google");
