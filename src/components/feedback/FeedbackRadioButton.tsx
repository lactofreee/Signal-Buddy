"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { CheckIcon } from "../utils/icons";

type Option = {
  value: string;
  label: string;
};

export default function FeedbackRadioButton({ className = "mt-2 flex gap-2" }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const initialCategory = searchParams.get("category") || null;
  const [selectedOption, setSelectedOption] = useState<string | null>(
    initialCategory,
  );

  const options: Option[] = [
    { value: "delay", label: "신호 지연" },
    { value: "malfunction", label: "오작동" },
    { value: "add-signal", label: "신호등 추가" },
    { value: "etc", label: "기타" },
  ];

  const handleToggle = (value: string) => {
    const newValue = selectedOption === value ? null : value;
    setSelectedOption(newValue);

    const params = new URLSearchParams(searchParams);
    if (newValue) {
      params.set("category", newValue);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={className}>
      {options.map((option) => (
        <label
          key={option.value}
          className="flex cursor-pointer items-center gap-1 theme-feedback-filter-category"
        >
          <input
            type="radio"
            name="option"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={() => handleToggle(option.value)}
            className="peer hidden"
          />
          <span className="flex h-5 w-5 items-center justify-center rounded-sm border-2 border-gray-300 bg-white transition-all peer-checked:border-gray-700">
            <CheckIcon
              className={`h-4 w-4 text-gray-700 transition-opacity ${
                selectedOption === option.value ? "opacity-100" : "opacity-0"
              }`}
            />
          </span>
          <span className="text-xs font-medium">{option.label}</span>
        </label>
      ))}
    </div>
  );
}
