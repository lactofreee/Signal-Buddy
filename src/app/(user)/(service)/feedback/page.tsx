import { EditIcon } from "lucide-react";
import FeedbackList from "@/src/components/feedback/FeedbackList";
import MobileToolbar from "@/src/components/feedback/MobileToolbar";
import FeedbackSidebar from "@/src/components/feedback/FeedbackSidebar";
import FeedbackSearchbar from "@/src/components/feedback/FeedbackSearchbar";
import MobileFeedbackFilterButtons from "@/src/components/feedback/MobileFeedbackFilterButtons";
import MobileToolbarHandleButton from "@/src/components/feedback/MobileToolbarHandleButton";

import Link from "next/link";

import { fetchFeedbackList } from "@/src/app/api/feedback/fetchFeedbackList";

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | undefined>>;
}) {
  const res = await fetchFeedbackList(searchParams);
  const feedbackList = res.data.searchResults;

  return (
    <div className="flex justify-center">
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
          <Link href={`/feedback/write`}>
            <EditIcon className="theme-edit-icon" />
          </Link>
        </div>

        {/* 메인 콘텐츠 영역 */}
        <div className="bg-blue mt-2 flex min-h-[917px] w-full">
          <FeedbackSidebar />
          <section className="flex flex-grow flex-col gap-3 md:ml-[22px]">
            <FeedbackSearchbar />
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
      </div>
    </div>
  );
}
