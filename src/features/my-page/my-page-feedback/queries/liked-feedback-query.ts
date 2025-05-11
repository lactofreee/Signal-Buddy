import { useQuery, keepPreviousData } from "@tanstack/react-query";
import client from "@/src/lib/api/client";
import { IFeedbackListItem } from "@/src/types/feedback/feedbackList";

type MyFeedbackResponse = {
  searchResults: IFeedbackListItem[];
  totalPages: number;
};

export const likedFeedbackQuery = (memberId?: number, page = 0, size = 15) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery<MyFeedbackResponse>({
    queryKey: ["myFeedbacks", memberId, page],
    queryFn: async () => {
      if (!memberId) return { searchResults: [], totalPages: 1 };

      const response = await client.get(
        `/api/members/${memberId}/feedbacks/liked`,
        { params: { page, size } },
      );

      if (response.data.status === "성공") {
        return response.data.data;
      }
      throw new Error("좋아한 피드백 불러오기 실패");
    },
    placeholderData: keepPreviousData,
    enabled: !!memberId,
  });
};
