import { EditIcon } from "lucide-react";
import FeedbackList from "@/src/features/feedback/feedback-list/components/feedback-list";
import MobileToolbar from "@/src/features/feedback/feedback-mobile/components/feedback-mobile-toolbar";
import FeedbackSidebar from "@/src/features/feedback/feedback-common/components/feedback-sidebar";
import FeedbackSearchbar from "@/src/features/feedback/feedback-common/components/feedback-searchbar";
import MobileFeedbackFilterButtons from "@/src/features/feedback/feedback-mobile/components/feedback-mobile-filter-buttons";
import MobileToolbarHandleButton from "@/src/features/feedback/feedback-mobile/components/feedback-mobile-toolbar-handle-button";

import Link from "next/link";

import {
  fetchFeedbackList,
  fetchTotalFeedback,
} from "@/src/app/api/feedback/fetchFeedbackList";

import Head from "next/head";
import FeedbackPagination from "@/src/features/feedback/feedback-list/components/feedback-pagination";

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | undefined>>;
}) {
  const searchParamsResolved = await searchParams;
  const page = parseInt(searchParamsResolved?.page || "0", 10);
  const size = parseInt(searchParamsResolved?.size || "10", 10);

  const res = await fetchFeedbackList(searchParams);
  const feedbackList = res.data.searchResults;
  const updatedTotalFeedback = res.data.totalElements;
  const totalPages = Math.ceil(updatedTotalFeedback / 10);

  return (
    <div className="flex justify-center">
      <Head>
        <title>피드백 게시판 - 페이지 {page + 1}</title>
        <meta
          name="description"
          content="피드백 게시판에서 다양한 피드백을 확인하세요."
        />
        <meta name="keywords" content="피드백, 게시판, 리뷰, 의견" />
        <meta
          property="og:title"
          content={`피드백 게시판 - 페이지 ${page + 1}`}
        />
        <meta
          property="og:description"
          content="피드백 게시판에서 다양한 피드백을 확인하세요."
        />
        <meta
          property="og:url"
          content={`https://signal-buddy.vercel.app/feedback?page=${page}`}
        />
        <link
          rel="canonical"
          href={`https://signal-buddy.vercel.app/feedback?page=${page}`}
        />
        {page > 0 && (
          <link
            rel="prev"
            href={`https://signal-buddy.vercel.app/feedback?page=${page - 1}`}
          />
        )}
        {page < totalPages - 1 && (
          <link
            rel="next"
            href={`https://signal-buddy.vercel.app/feedback?page=${page + 1}`}
          />
        )}
      </Head>
      <div className="flex w-full max-w-[1240px] flex-col items-center justify-center">
        {/* 툴바 영역 */}
        <div className="sticky top-0 z-10 flex w-full flex-col theme-bg pb-[11px]">
          <div className="relative mt-2 flex h-[30px] items-center justify-between md:hidden">
            <MobileFeedbackFilterButtons />
            <MobileToolbarHandleButton />
            <MobileToolbar />
          </div>
        </div>

        {/* 네비게이션 */}
        <div className="theme-line flex h-10 w-full items-center justify-between border-b text-sm font-extrabold">
          <p className="theme-header-text">{`홈 > 피드백 게시판`}</p>
        </div>

        {/* 메인 콘텐츠 영역 */}
        <div className="bg-blue mt-4 flex min-h-[917px] w-full mb-10">
          <FeedbackSidebar />
          <section className="flex flex-grow flex-col gap-3 md:ml-[22px]">
            <FeedbackSearchbar className="hidden md:flex mb-2" />
            {feedbackList.length ? (
              <FeedbackList feedbackList={feedbackList} />
            ) : (
              <div className="flex justify-center mt-[100px]">
                <p className="theme-feedback-no-result text-sm">
                  검색 결과가 없습니다.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* 페이지네이션 */}
        <FeedbackPagination totalPages={totalPages} page={page} size={size} />
      </div>
    </div>
  );
}
