"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function useThemeDisplay() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayTheme =
    theme !== "system"
      ? theme === "dark"
        ? "Dark"
        : "Light"
      : resolvedTheme === "dark"
        ? "Dark"
        : "Light";

  const displayThemeName = theme
    ? theme.charAt(0).toUpperCase() + theme.slice(1)
    : "";

  return {
    theme,
    resolvedTheme,
    setTheme,
    mounted,
    displayTheme,
    displayThemeName,
  };
}
