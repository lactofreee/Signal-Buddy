"use server";
import { auth, signIn, signOut } from "@/src/auth";

export const signInWithCredentials = async (options: {
  [key: string]: string | number | boolean;
}) => {
  return await signIn("credentials", options);
};

export const signInWithGoogle = async () => {
  await signIn("google", {
    /* 옵션 */
  });
  // ...
};
export const signInWithGitHub = async () => {
  await signIn("github", {
    /* 옵션 */
  });
  // ...
};
export const signOutWithForm = async () => {
  await signOut();
};
export { auth as getSession };
