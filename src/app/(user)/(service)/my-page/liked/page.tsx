"use client";

import FeedbackList from "@/src/components/feedback/FeedbackList";
import client from "@/src/lib/api/client";
import { IFeedbackListItem } from "@/src/types/feedback/feedbackList";
import { useQuery } from "@tanstack/react-query";
import { EditIcon, Link } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();

  const {
    data: feedbackList = [],
    isLoading,
    isError,
    error,
  } = useQuery<IFeedbackListItem[]>({
    queryKey: ["myFeedbacks", session?.user?.memberId],
    queryFn: async () => {
      const response = await client.get(
        `/api/members/${session?.user.memberId}/feedbacks/liked`,
      );
      const apiData = response.data;
      const feedbackList = apiData.data.searchResults;

      if (apiData.status === "성공") {
        return feedbackList as IFeedbackListItem[];
      }
      throw new Error("최근 경로 불러오기 실패");
    },
    enabled: !!session?.user?.memberId,
  });

  if (isLoading) return <div>로딩 중...</div>;

  if (isError && error instanceof Error)
    return <div>에러가 발생했습니다: {error.message}</div>;
  console.log(session?.user?.memberId);

  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-[600px] flex-col items-center justify-center">
        {/* 툴바 영역 */}
        <div className="sticky top-0 z-10 flex w-full flex-col theme-bg pb-[11px]">
          <div className="relative mt-2 flex h-[30px] items-center justify-between md:hidden"></div>
        </div>

        {/* 네비게이션 */}
        <div className="theme-line flex h-10 w-full items-center justify-between border-b text-sm font-extrabold">
          <p className="theme-header-text">{` 내가 좋아한 피드백`}</p>
        </div>

        {/* 메인 콘텐츠 영역 */}
        <div className="bg-blue mt-2 flex min-h-[917px] w-full">
          <section className="flex flex-grow flex-col gap-3 md:ml-[22px]">
            {feedbackList.length ? (
              <FeedbackList feedbackList={feedbackList} />
            ) : (
              <div className="flex justify-center mt-[100px]">
                <p className="theme-feedback-no-result text-sm">
                  좋아한 피드백이 없습니다.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
