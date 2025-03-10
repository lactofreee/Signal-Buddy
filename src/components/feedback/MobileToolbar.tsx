"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react";
import useToolbarStore from "@/src/store/feedback/useToolbarStore";
import FeedbackRadioButton from "./FeedbackRadioButton";
import FeedbackSearchbar from "./FeedbackSearchbar";

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
          className="absolute left-0 top-[40px] h-[250px] w-full rounded-b-md theme-bg pt-[10px] md:hidden"
        >
          <div>
            <h2 className="theme-feedback-filter-category flex h-5 items-center text-xs font-semibold ">
              피드백 유형
            </h2>
            <FeedbackRadioButton />
          </div>

          <div className="mt-3">
            <h2 className="theme-feedback-filter-category flex h-5 items-center text-xs font-semibold">
              검색
            </h2>
            <FeedbackSearchbar className="flex flex-col md:hidden mt-3" />
          </div>
        </div>
      )}
    </>
  );
}
