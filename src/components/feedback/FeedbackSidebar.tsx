"use client";

import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import FeedbackRadioButton from "./FeedbackRadioButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function FeedbackSidebar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentStatus = searchParams.get("status") || "";

  const handleToggle = (status: string) => {
    const newStatus =
      status === "답변 전"
        ? "before"
        : status === "답변 후"
          ? "completion"
          : "";

    const params = new URLSearchParams(searchParams);
    if (newStatus) {
      params.set("status", newStatus);
    } else {
      params.delete("status");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <aside className="hidden w-[190px] flex-shrink-0 md:block">
      {/* 답변 여부 필터 */}
      <div
        className="text-gray-500"
        role="group"
        aria-labelledby="feedback-status"
      >
        <h2 className="text-xs font-semibold theme-feedback-filter">
          답변여부
        </h2>
        <ToggleGroup type="single" className="flex flex-col items-start">
          {["ALL", "답변 전", "답변 후"].map((status) => {
            const isChecked =
              (status === "ALL" && !currentStatus) ||
              (status === "답변 전" && currentStatus === "before") ||
              (status === "답변 후" && currentStatus === "completion");

            return (
              <ToggleGroupItem
                key={status}
                value={status}
                onClick={() => handleToggle(status)}
                aria-checked={isChecked}
                className={`flex items-center font-bold text-base ${
                  isChecked
                    ? "theme-feedback-filter-answer-checked"
                    : "theme-feedback-filter-answer-unchecked"
                }`}
              >
                {status}
              </ToggleGroupItem>
            );
          })}
        </ToggleGroup>
      </div>

      <div className="my-5 border-b theme-line"></div>

      {/* 피드백 유형 필터 */}
      <h2 className="text-xs font-semibold theme-feedback-filter">
        피드백 유형
      </h2>
      <FeedbackRadioButton className="mt-2 flex flex-col gap-2 ml-2" />
    </aside>
  );
}
