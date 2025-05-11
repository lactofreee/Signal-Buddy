import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "sonner";

export const deleteFeedback = async (
  feedbackId: string,
  token: string,
  router: AppRouterInstance,
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/feedbacks/${feedbackId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      },
    );

    if (!res.ok) {
      const errorData = await res.json(); // 서버 응답 확인
      throw new Error(errorData.message || "피드백 삭제에 실패했습니다.");
    }

    router.push("/feedback");
    toast.success("게시물이 삭제되었습니다.");

    return true;
  } catch (error) {
    router.push(`/feedback/${feedbackId}`);
    toast.error("게시물 삭제에 실패했습니다.");
    console.error("❌ deleteFeedback Error:", error);
    throw error;
  }
};
