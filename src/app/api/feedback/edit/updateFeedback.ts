import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const updateFeedback = async (
  formData: FormData,
  feedbackId: number,
  token: string,
  router: AppRouterInstance,
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/feedbacks/${feedbackId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
        body: formData,
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "피드백 업데이트에 실패했습니다.");
    }

    const data = await res.json();
    console.log("✅ 피드백 업데이트 성공:", data);
    router.push(`/feedback/${feedbackId}`);
    return data;
  } catch (error) {
    console.error("❌ updateFeedback Error:", error);
    throw error;
  }
};
