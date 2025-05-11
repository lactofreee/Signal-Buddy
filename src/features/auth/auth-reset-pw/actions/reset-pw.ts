import client from "@/src/lib/api/client";

export const resetPW = async (body: { email: string; newPassword: string }) => {
  return await client.post("/api/members/password-reset", body);
};
