import FeedbackList from "@/src/components/feedback/FeedbackList";
import FeedbackRadioButton from "@/src/components/feedback/FeedbackRadioButton";
import MobileToolbar from "@/src/components/feedback/MobileToolbar";
import MobileToolbarHandleButton from "@/src/components/feedback/MobileToolbarHandleButton";
import { promises } from "dns";
import { EditIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-[1240px] flex-col items-center justify-center">
        {/* 툴바 영역 */}
        <div className="sticky top-0 z-10 flex w-full flex-col bg-gray-100 pb-[11px]">
          <div className="relative mt-2 flex h-[30px] items-center justify-between md:hidden">
            <div className="flex items-center gap-1">
              <div className="flex h-[30px] w-[80px] items-center justify-center rounded-[30px] bg-gray-800 text-sm font-semibold text-white">
                ALL
              </div>
              <div className="flex h-[30px] w-[80px] items-center justify-center rounded-[30px] bg-gray-300 text-sm font-semibold text-gray-600">
                답변 전
              </div>
              <div className="flex h-[30px] w-[80px] items-center justify-center rounded-[30px] bg-gray-300 text-sm font-semibold text-gray-600">
                답변 후
              </div>
            </div>

            <MobileToolbarHandleButton />
            {/* 토글 드롭다운 툴바 */}
            <MobileToolbar />
          </div>
        </div>
        <div className="border-grey-300 flex h-10 w-full items-center justify-between border-b text-sm font-extrabold">
          <div className="flex">
            <p className="text-grey-700">{`홈 > 피드백 게시판`}</p>
          </div>
          <Link href={`/feedback/write`}>
            <EditIcon className="text-gray-500" />
          </Link>
        </div>
        {/* 메인 영역 */}
        <div className="bg-blue mt-2 flex min-h-[917px] w-full">
          {/* 사이드바 영역 */}
          <aside className="hidden w-[190px] flex-shrink-0 md:block">
            <h2
              className="text-grey-500 flex h-5 items-center text-xs font-semibold"
              id="feedback-status"
            >
              답변여부
            </h2>
            <div
              className="text-gray-500"
              role="group"
              aria-labelledby="feedback-status"
            >
              <p
                className="flex h-10 items-center font-bold text-black"
                role="radio"
                aria-checked="false"
              >
                ALL
              </p>
              <p
                className="flex h-10 items-center font-bold"
                role="radio"
                aria-checked="false"
              >
                답변 전
              </p>
              <p
                className="flex h-10 items-center font-bold"
                role="radio"
                aria-checked="false"
              >
                답변 후
              </p>
            </div>
            <div className="border-grey-300 my-5 border-b"></div>
            <div>
              <div>
                <h2 className="text-grey-500 flex h-5 items-center text-xs font-semibold">
                  피드백 유형
                </h2>
              </div>

              <FeedbackRadioButton className="mt-2 flex flex-col gap-2" />
            </div>
          </aside>
          {/* 본문 영역 */}
          <section className="flex flex-grow flex-col gap-3 md:ml-[22px]">
            <div className="hidden h-10 w-full gap-1 md:flex">
              <div
                className="border-1 flex h-full w-[117px] items-center justify-start rounded-[8px] border border-gray-300 bg-white p-3 text-sm font-medium text-gray-500"
                role="button"
                tabIndex={0}
                aria-label="검색조건"
              >
                검색조건
              </div>
              <form className="mr-1" aria-labelledby="search-form">
                <label htmlFor="search-input" className="sr-only">
                  검색어를 입력해주세요.
                </label>
                <input
                  id="search-input"
                  type="text"
                  className="border-1 h-10 w-[264px] rounded-[8px] border border-gray-300 p-3 text-sm font-medium text-gray-500"
                  placeholder="검색어를 입력해주세요."
                  aria-describedby="search-input-helper"
                />
                <button
                  className="ml-1 h-10 w-[70px] rounded-[8px] bg-gray-800 text-sm font-medium text-white"
                  aria-label="검색 버튼"
                >
                  검색
                </button>
              </form>
            </div>
            <FeedbackList />
          </section>
        </div>
      </div>
    </div>
  );
}
