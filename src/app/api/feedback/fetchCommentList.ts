import { IFeedbackCommentListResponse } from "@/src/types/feedback/feedbackList";

export const fetchCommentList = async (
  id: string,
): Promise<IFeedbackCommentListResponse | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/feedbacks/${id}/comments?size=20`,
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch comments. Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching comments:", error);
    return null;
  }
};
