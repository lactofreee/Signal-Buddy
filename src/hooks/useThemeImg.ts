"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function useThemeImg() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  let displayTheme = "system";
  if (theme !== "system") {
    displayTheme = theme === "dark" ? "Dark" : "Light";
  } else {
    displayTheme = resolvedTheme === "dark" ? "Dark" : "Light";
  }

  return {
    theme,
    resolvedTheme,
    mounted,
  };
}
