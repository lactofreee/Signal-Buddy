"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownIcon } from "../utils/icons";

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

  // 검색 실행 함수
  const handleSearch = (term: string) => {
    if (term.trim()) {
      params.set("keyword", term.trim());
    } else {
      params.delete("keyword");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  // 드롭다운 선택 시 실행
  const handleSelectOption = (option: string) => {
    const value = option === "제목 + 내용" ? "content" : "writer";
    setSelectedOption(option);
    params.set("target", value);
    replace(`${pathname}?${params.toString()}`);
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchTerm);
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
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onSelect={() => handleSelectOption(option)}
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 검색 입력창 */}
      <form onSubmit={handleSubmit} className="flex items-center gap-1">
        <input
          type="text"
          className="border-1 h-10 w-[264px] rounded-[8px] border theme-line theme-content-bg p-3 text-sm font-medium text-gray-500"
          placeholder="검색어를 입력해주세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="h-10 w-[70px] rounded-[8px] theme-feedback-filter-search-button text-sm font-medium text-white"
        >
          검색
        </button>
      </form>
    </div>
  );
}
