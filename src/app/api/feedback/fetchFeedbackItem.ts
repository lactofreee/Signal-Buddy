import { IFeedbackDetailResponse } from "@/src/types/feedback/feedbackList";

export const fetchDataFeedbackItem = async (id: string, TOKEN: string): Promise<IFeedbackDetailResponse> => {
  const END_POINT = `${process.env.API_BASE_URL}/api/feedbacks/${id}`;
  console.log(END_POINT);
  try {
    const res = await fetch(END_POINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: TOKEN,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || "데이터를 가져오는 데 실패했습니다.",
      );
    }
    return await res.json();
  } catch (error) {
    console.error("❌ fetchData Error:", error);
    throw error;
  }
};