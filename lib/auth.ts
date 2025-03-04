"use server";

import { signIn, signOut } from "@/src/auth";

export const kakaoLogin = async () => {
    await signIn("kakao", {redirectTo: "/"})
};
export const logout = async () => {
    await signOut({redirectTo: "/"})
};