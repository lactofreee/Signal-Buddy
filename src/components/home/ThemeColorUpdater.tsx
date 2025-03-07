"use client";

import { useEffect } from "react";

const ThemeColorUpdater = () => {
  useEffect(() => {
    const updateThemeColor = () => {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const metaThemeColor = document.querySelector("meta[name='theme-color']");
      if (metaThemeColor) {
        metaThemeColor.setAttribute("content", isDark ? "#18181B" : "#F3F3F3");
      }
    };

    updateThemeColor();
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", updateThemeColor);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", updateThemeColor);
    };
  }, []);

  return null;
};

export default ThemeColorUpdater;
