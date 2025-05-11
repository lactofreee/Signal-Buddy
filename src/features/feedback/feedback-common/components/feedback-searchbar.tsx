"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { ArrowDownIcon } from "@/src/components/utils/icons";
import FeedbackSearchInput from "./feedback-search-input";

export default function FeedbackSearchbar({
  className,
}: {
  className: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // URL에서 검색 조건과 키워드 가져오기
  const keywordFromURL = searchParams.get("keyword") || "";
  const targetFromURL = searchParams.get("target") || "content";

  // 상태 관리
  const [searchTerm, setSearchTerm] = useState(keywordFromURL);
  const [selectedOption, setSelectedOption] = useState(
    targetFromURL === "content" ? "제목 + 내용" : "작성자",
  );

  // URLSearchParams 캐싱 (최적화)
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  // URL의 keyword 값이 변경되면 searchTerm 업데이트
  useEffect(() => {
    setSearchTerm(keywordFromURL);
  }, [keywordFromURL]);

  // 드롭다운 선택 시 실행
  const handleSelectOption = (option: string) => {
    const value = option === "제목 + 내용" ? "content" : "writer";
    setSelectedOption(option);
    params.set("target", value);
    replace(`${pathname}?${params.toString()}`);
  };

  const searchOptions = ["제목 + 내용", "작성자"];

  return (
    <div className={`h-10 w-full gap-1 ${className}`}>
      {/* 검색 조건 드롭다운 */}
      <DropdownMenu>
        <DropdownMenuTrigger className="border-1 flex h-full w-[117px] items-center justify-between rounded-[8px] border theme-line theme-content-bg p-3 text-sm font-medium theme-feedback-filter-search">
          {selectedOption}
          <ArrowDownIcon className="w-4 text-gray-500" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-[120px] text-sm font-medium text-gray-700"
          align="end"
        >
          {searchOptions.map((option) => (
            <DropdownMenuItem
              key={option}
              className="cursor-pointer px-4 py-2 hover:theme-feedback-search-dropdown-hover theme-feedback-search-dropdown "
              onSelect={() => handleSelectOption(option)}
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 검색 입력창 */}
      <FeedbackSearchInput
        params={params}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        pathname={pathname}
        replace={replace}
      />
    </div>
  );
}
