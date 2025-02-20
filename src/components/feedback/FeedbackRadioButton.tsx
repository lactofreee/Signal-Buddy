"use client";

import React, { useState } from "react";
import { CheckIcon } from "../utils/icons";

type Option = {
  value: string;
  label: string;
};

export default function FeedbackRadioButton({
  className = "mt-2 flex gap-2",
}) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options: Option[] = [
    { value: "option1", label: "유형1" },
    { value: "option2", label: "유형2" },
    { value: "option3", label: "유형3" },
  ];

  const handleRadioChange = (value: string) => {
    setSelectedOption((prev) => (prev === value ? null : value));
  };

  return (
    <div className={className}>
      {options.map((option) => (
        <label
          key={option.value}
          className="flex cursor-pointer items-center gap-1"
        >
          <input
            type="radio"
            name="option"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={() => handleRadioChange(option.value)}
            className="peer hidden"
          />
          <span className="block h-5 w-5 rounded-sm border-2 border-gray-300 bg-white transition-all">
            <div
              className={`flex h-full items-center justify-center ${
                selectedOption === option.value ? "flex" : "hidden"
              }`}
            >
              <CheckIcon />
            </div>
          </span>
          <span className="text-xs font-medium text-gray-500">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}
