import { IFeedbackDetailResponse } from "@/src/types/feedback/feedbackList";

export const fetchDataFeedbackItem = async (
  id: string,
): Promise<IFeedbackDetailResponse> => {
  const END_POINT = `${process.env.API_BASE_URL}/api/feedbacks/${id}`;
  try {
    const res = await fetch(END_POINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || "데이터를 가져오는 데 실패했습니다.",
      );
    }
    const feedbackItem = await res.json();
    console.log(feedbackItem);
    return feedbackItem;
  } catch (error) {
    console.error("❌ fetchData Error:", error);
    throw error;
  }
};
