"use client";

import LikedFeedbackList from "@/src/features/my-page/my-page-feedback/components/my-page-feedback-list";
import MyPlacePagination from "@/src/features/my-place/my-place-common/components/my-place-pagination";
import { ArrowLeftIcon } from "@/src/components/utils/icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { likedFeedbackQuery } from "@/src/features/my-page/my-page-feedback/queries/liked-feedback-query";

export default function Page() {
  const { data: session } = useSession();
  const [page, setPage] = useState(0);
  const size = 15;

  const {
    data: feedbackList = { searchResults: [], totalPages: 1 },
    isLoading,
    isError,
    error,
  } = likedFeedbackQuery(session?.user?.memberId, page, size);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError && error instanceof Error)
    return <div>에러가 발생했습니다: {error.message}</div>;

  const { searchResults, totalPages } = feedbackList;

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
            <>
              <LikedFeedbackList feedbackList={searchResults} />
              <MyPlacePagination
                page={page}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </>
          ) : (
            <div className="flex justify-center my-[100px]">
              <p className="theme-feedback-no-result text-sm">
                좋아한 피드백이 없습니다.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
