import client from "../lib/api/client";

export const getFeedbackList = async (params: URLSearchParams) => {
  return await client.get("/api/feedbacks", { params });
};
