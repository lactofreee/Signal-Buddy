"use client";

import FeedbackList from "@/src/components/feedback/FeedbackList";
import MyPlacePagination from "@/src/components/my-place/MyPlacePagination";
import { ArrowLeftIcon, ArrowRightIcon } from "@/src/components/utils/icons";
import client from "@/src/lib/api/client";
import { IFeedbackListItem } from "@/src/types/feedback/feedbackList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

type MyPlageResponse = {
  searchResults: IFeedbackListItem[];
  totalPages: number;
};

export default function Page() {
  const { data: session, status } = useSession();
  const [page, setPage] = useState(0);
  const size = 15;

  const {
    data: feedbackList = { searchResults: [], totalPages: 1 },
    isLoading,
    isError,
    error,
  } = useQuery<MyPlageResponse>({
    queryKey: ["myFeedbacks", session?.user?.memberId, page],
    queryFn: async () => {
      if (!session?.user?.memberId)
        return {
          searchResults: [],
          totalPages: 1,
        };

      const response = await client.get(
        `/api/members/${session?.user.memberId}/feedbacks/liked`,
        {
          params: { page, size },
        },
      );

      if (response.data.status === "성공") {
        return {
          searchResults: response.data.data.searchResults,
          totalPages: response.data.data.totalPages,
        };
      }
      throw new Error("최근 경로 불러오기 실패");
    },
    placeholderData: keepPreviousData,
    enabled: !!session?.user?.memberId,
  });

  const { searchResults, totalPages } = feedbackList;

  console.log(totalPages);

  if (isLoading) return <div>로딩 중...</div>;

  if (isError && error instanceof Error)
    return <div>에러가 발생했습니다: {error.message}</div>;
  console.log(session?.user?.memberId);

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-[600px] flex-col gap-5 pt-2 sm:px-4">
        <section className="flex flex-col gap-2">
          <div className="theme-line flex h-10 w-full items-center border-b text-sm font-extrabold">
            <Link href="/my-page/profile">
              <span className="theme-my-page-arrow-left-icon">
                <ArrowLeftIcon />
              </span>
            </Link>
            <h1 className="theme-header-text text-sm font-extrabold">
              내가 좋아한 피드백
            </h1>
          </div>
        </section>
        {/* 메인 콘텐츠 영역 */}
        <section className="flex flex-grow flex-col gap-3">
          {searchResults.length ? (
            <FeedbackList feedbackList={searchResults} />
          ) : (
            <div className="flex justify-center my-[100px]">
              <p className="theme-feedback-no-result text-sm">
                좋아한 피드백이 없습니다.
              </p>
            </div>
          )}
          <MyPlacePagination
            page={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </section>
      </div>
    </div>
  );
}
