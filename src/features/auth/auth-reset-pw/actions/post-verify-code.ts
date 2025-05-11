import client from "@/src/lib/api/client";

export const sendAuthCode = async (email: string) => {
  return await client.post("/api/auth/auth-code", { email });
};
export const verifyAuthCode = async (body: {
  purpose: string;
  email: string;
  code: string;
}) => {
  return await client.post("/api/auth/verify-code", body);
};
