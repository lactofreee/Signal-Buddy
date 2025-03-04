"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react";
import useToolbarStore from "@/src/store/feedback/useToolbarStore";
import FeedbackRadioButton from "./FeedbackRadioButton";

export default function MobileToolbar() {
  const { isMobileToolbarOpen, closeMobileToolbar } = useToolbarStore();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const keywordFromURL = useMemo(
    () => searchParams.get("keyword") || "",
    [searchParams],
  );

  useEffect(() => {
    setSearchTerm(keywordFromURL);
  }, [keywordFromURL]);

  // 검색 실행 함수
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term.trim()) {
      params.set("keyword", term.trim());
    } else {
      params.delete("keyword");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchTerm);
    closeMobileToolbar();
  };

  return (
    <>
      {isMobileToolbarOpen && (
        <div
          style={{
            boxShadow: "0 5px 5px -5px gray",
          }}
          className="absolute left-0 top-[40px] h-[250px] w-full rounded-b-md bg-gray-100 pt-[10px] md:hidden"
        >
          <div>
            <h2 className="text-grey-500 flex h-5 items-center text-xs font-semibold">
              피드백 유형
            </h2>
            <FeedbackRadioButton />
          </div>

          <div className="mt-3">
            <h2 className="text-grey-500 flex h-5 items-center text-xs font-semibold">
              검색
            </h2>
            <div
              className="border-1 flex h-10 w-[117px] items-center justify-start rounded-[8px] border border-gray-300 bg-white p-3 text-sm font-medium text-gray-500"
              role="button"
              tabIndex={0}
              aria-label="검색조건"
            >
              검색조건
            </div>
            <form
              className="mr-1 mt-2 flex flex-col gap-2"
              aria-labelledby="search-form"
              onSubmit={handleSubmit}
            >
              <input
                id="search-input"
                type="text"
                className="border-1 h-10 w-full rounded-[8px] border border-gray-300 p-3 text-sm font-medium text-gray-500"
                placeholder="검색어를 입력해주세요."
                aria-describedby="search-input-helper"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="h-10 w-full rounded-[8px] bg-gray-800 text-sm font-medium text-white"
                aria-label="검색 버튼"
              >
                검색
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
