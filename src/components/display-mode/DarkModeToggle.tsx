"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { ArrowDownIcon } from "../utils/icons";

export function DropdownThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  let displayTheme = "system";
  if (theme !== "system") {
    displayTheme = theme === "dark" ? "Dark" : "Light";
  } else {
    displayTheme = resolvedTheme === "dark" ? "Dark" : "Light";
  }

  const handleChange = (value: string) => {
    setTheme(value);
  };

  const displayThemeName = theme
    ? theme.charAt(0).toUpperCase() + theme.slice(1)
    : "";

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
