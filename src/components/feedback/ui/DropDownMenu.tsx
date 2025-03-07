"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownIcon } from "../../utils/icons";

export default function DropDownMenu({
  addCategory,
}: {
  addCategory: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [category, setCategory] = React.useState<string>("피드백 유형 선택");

  const onValueChange = (newValue: string) => {
    setCategory(newValue);
    addCategory(newValue);
  };

  const formatCategory = (category: string) => {
    switch (category) {
      case "delay":
        return "신호 지연";
      case "malfunction":
        return "오작동";
      case "add_signal":
        return "신호등 추가";
      case "etc":
        return "기타";
      default:
        return "피드백 유형 선택";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="text-gray-400 h-12 flex justify-between border theme-line theme-content-bg outline-none shadow-none hover:text-gray-500"
        >
          <p>{formatCategory(category)}</p>
          <ArrowDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[822px]">
        <DropdownMenuLabel className="text-gray-400">
          피드백 유형
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={category}
          onValueChange={onValueChange}
          className="text-gray-400"
        >
          <DropdownMenuRadioItem value="delay">신호 지연</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="malfunction">
            오작동
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="add_signal">
            신호등 추가
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="etc">기타</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
