"use client";

import { ArrowLeftIcon, CheckIcon } from "@/src/components/utils/icons";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleToggleChange = (value: string) => {
    setSelectedOption((prev) => (prev === value ? null : value));
  };

  return (
    <div className="flex flex-col md:mx-auto md:w-[821px]">
      {/* 헤더 영역 */}
      <Link href={`/feedback`} className="flex h-10 items-center gap-1 border-b border-gray-300">
        <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
        <p className="text-sm font-semibold">뒤로가기</p>
      </Link>
      <form className="flex flex-col gap-4 pt-2">
        {/* 제목 입력 */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-500">제목</p>
          <input
            type="text"
            className="h-12 rounded-[4px] p-4 outline outline-1 outline-gray-300"
            placeholder="제목을 입력해주세요."
          />
        </div>

        {/* 피드백 유형 선택 */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-500">피드백 유형</p>
          <input
            type="text"
            className="h-12 rounded-[4px] p-4 outline outline-1 outline-gray-300"
            placeholder="피드백 유형 선택"
          />
        </div>

        {/* 본문 입력 */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-500">본문</p>
          <textarea
            className="h-[409px] resize-none rounded-[4px] p-4 outline outline-1 outline-gray-300"
            placeholder="내용을 입력해주세요."
          />
        </div>

        {/* 피드백 위치 */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-500">피드백 위치</p>
          <input
            type="text"
            className="h-12 rounded-[4px] p-4 outline outline-1 outline-gray-300"
            placeholder="위치를 입력해주세요."
          />
        </div>

        {/* 숨김처리 여부 - 토글 버튼 */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-500">숨김처리</p>

          <div
            className={`mb-[187px] flex cursor-pointer items-center gap-1 transition-all`}
            onClick={() => handleToggleChange("isHidden")}
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-sm border-2 transition-all ${
                selectedOption === "isHidden" ? "bg-gray-500" : "bg-white"
              }`}
            >
              {selectedOption === "isHidden" && (
                <CheckIcon className="text-white" />
              )}
            </div>
            <span className="text-xs font-medium text-gray-500">
              관리자만 보기
            </span>
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="flex justify-end">
          <button className="mb-[72px] h-10 w-[100px] rounded-[8px] bg-teal text-sm font-semibold text-white">
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
