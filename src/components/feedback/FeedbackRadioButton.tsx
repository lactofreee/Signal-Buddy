"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../shadcn/components/ui/toggle-group";

type Option = {
  value: string;
  label: string;
};

export default function FeedbackRadioButton({ className = "mt-2 flex gap-2" }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const initialCategory = searchParams.getAll("category") || [];
  const [selectedOptions, setSelectedOptions] =
    useState<string[]>(initialCategory);

  const options: Option[] = [
    { value: "delay", label: "신호 지연" },
    { value: "malfunction", label: "오작동" },
    { value: "add-signal", label: "신호등 추가" },
    { value: "etc", label: "기타" },
  ];

  const handleToggle = (value: string) => {
    let newSelectedOptions;

    if (selectedOptions.includes(value)) {
      newSelectedOptions = selectedOptions.filter((option) => option !== value);
    } else {
      newSelectedOptions = [...selectedOptions, value];
    }

    setSelectedOptions(newSelectedOptions);

    // 쿼리 파라미터 업데이트
    const params = new URLSearchParams(searchParams);
    params.delete("category");
    newSelectedOptions.forEach((option) => params.append("category", option));

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={className}>
      <ToggleGroup type="multiple" className="flex md:flex-col items-start">
        {options.map((option) => (
          <ToggleGroupItem
            key={option.value}
            value={option.value}
            onClick={() => handleToggle(option.value)}
          >
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
