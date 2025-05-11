import client from "@/src/lib/api/client";

export const join = async (body: FormData) => {
  return await client.post("/api/members/join", body, {});
};
