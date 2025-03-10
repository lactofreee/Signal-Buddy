import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "localhost:3000",
  withCredentials: true,
});

client.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session) {
    config.headers["Authorization"] = session.user.token;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
        await signOut();
        redirect("/login");
      } catch (err) {
        console.log(err);
      }
    }
  },
);
export default client;
