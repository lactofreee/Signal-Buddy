"use client";

import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react";
import useToolbarStore from "@/src/store/feedback/useToolbarStore";
import FeedbackRadioButton from "../../feedback-common/components/feedback-radio-button";
import FeedbackSearchbar from "../../feedback-common/components/feedback-searchbar";

export default function MobileToolbar() {
  const { isMobileToolbarOpen } = useToolbarStore();

  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");

  const keywordFromURL = useMemo(
    () => searchParams.get("keyword") || "",
    [searchParams],
  );

  useEffect(() => {
    setSearchTerm(keywordFromURL);
  }, [keywordFromURL]);

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
