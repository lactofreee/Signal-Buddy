"use client";

import * as React from "react";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/src/components/ui/dropdown-menu";
import { ArrowDownIcon } from "@/src/components/utils/icons";
import useThemeDisplay from "@/src/hooks/use-theme-display";

export function DropdownThemeToggle() {
  const { theme, setTheme, mounted, displayThemeName } = useThemeDisplay();

  if (!mounted) return null;

  const handleChange = (value: string) => {
    setTheme(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-none theme-bg shadow-none pr-0 hover:theme-bg "
        >
          {displayThemeName}
          <ArrowDownIcon className="!w-3 theme-chevron" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <DropdownMenuRadioGroup value={theme} onValueChange={handleChange}>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
