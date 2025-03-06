import client from "../lib/api/client";
import server from "../lib/api/server";

export const login = async (body: { id: string; password: string }) => {
  return await server.post("/api/auth/login", body);
};

export const join = async (body: FormData) => {
  return await client.post("/api/members/join", body, {});
};

export const refresh = async () => {
  return await client.post("/api/auth/reissue");
};
