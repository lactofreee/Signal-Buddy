import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{astro,html,js,ts,jsx,tsx,md,mdx,svelte}",
    "./node_modules/@shadcn/ui/dist/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        white: "#FFFFFF",
        black: "#000000",
        red: "#FF6156",
        yellow: "#FFBD2B",
        green: "#2CCA3E",
        teal: "#8DB4AF",
        pink: "#FFE4E9",
        gray: {
          "100": "#F3F3F3",
          "200": "#E8E8E8",
          "300": "#CED1D8",
          "400": "#90A0B0",
          "500": "#64748B",
          "600": "#4B5563",
          "700": "#3F3F46",
          "800": "#27272A",
          "900": "#18181B",
          "950": "#09090B",
        },
        screens: {
          xm: "376px",
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
          "3xl": "1920px",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        Pretendard: ["Pretendard", "sans-serif"],
        Overpass: ["Overpass", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function myPlugin({
      addUtilities,
    }: {
      addUtilities: (
        utilities: Record<string, Record<string, string>>,
        options?: {
          variants?: string[];
          respectPrefix?: boolean;
          respectImportant?: boolean;
        },
      ) => void;
    }) {
      addUtilities({
        ".theme-bg": {
          "@apply bg-gray-100 dark:bg-gray-900": "",
        },
        ".theme-nav": {
          "@apply text-gray-700 dark:text-gray-100": "",
        },
        ".theme-title": {
          "@apply bg-gray-100 dark:bg-black": "",
        },
        ".theme-content-bg": {
          "@apply bg-white dark:bg-gray-800": "",
        },
        ".theme-line": {
          "@apply border-gray-300 dark:border-gray-700": "",
        },
        ".theme-line-light": {
          "@apply border-gray-300 dark:border-gray-400": "",
        },
        ".theme-content-address": {
          "@apply text-gray-500 dark:text-gray-400": "",
        },
        ".theme-footer-bg": {
          "@apply bg-white dark:bg-gray-800": "",
        },
        ".theme-footer-nav": {
          "@apply text-gray-500 dark:text-gray-200": "",
        },
        ".theme-footer-menu": {
          "@apply text-gray-400 dark:text-gray-300": "",
        },
        ".theme-footer-rights": {
          "@apply text-gray-500 dark:text-gray-300": "",
        },
        ".theme-footer-catchphrase": {
          "@apply text-gray-500 dark:text-gray-300": "",
        },
        ".theme-footer-line": {
          "@apply border-gray-300 dark:border-gray-700": "",
        },
        ".theme-menu-nickname": {
          "@apply text-gray-700 dark:text-gray-100": "",
        },
        ".theme-nickname": {
          "@apply text-gray-700 dark:text-gray-100": "",
        },
        ".theme-menu-email": {
          "@apply text-gray-500 dark:text-gray-400": "",
        },
        ".theme-email": {
          "@apply text-gray-500 dark:text-gray-400": "",
        },
        ".theme-menu-line": {
          "@apply border-gray-300 dark:border-gray-700": "",
        },
        ".theme-menu-menu": {
          "@apply text-gray-500 dark:text-gray-300": "",
        },
        ".theme-menu-chevron": {
          "@apply text-gray-500 dark:text-gray-400": "",
        },
        ".theme-feedback-button-checked": {
          "@apply bg-gray-600 dark:bg-gray-400": "",
        },
        ".theme-feedback-button-unchecked": {
          "@apply bg-gray-300 text-gray-600 dark:bg-gray-800 dark:text-gray-300":
            "",
        },
        ".theme-edit-icon": {
          "@apply text-gray-500 dark:text-gray-400": "",
        },
        ".theme-feedback-title": {
          "@apply text-black dark:text-white": "",
        },
        ".theme-feedback-content": {
          "@apply text-gray-600 dark:text-gray-300": "",
        },
        ".theme-content-text": {
          "@apply text-gray-600 dark:text-gray-300": "",
        },
        ".theme-content-text-dark": {
          "@apply text-gray-500 dark:text-gray-400": "",
        },
        ".theme-feedback-user": {
          "@apply text-gray-500 dark:text-gray-400": "",
        },
        ".theme-feedback-filter": {
          "@apply text-gray-500 dark:text-gray-300": "",
        },
        ".theme-feedback-filter-answer-checked": {
          "@apply text-gray-900 dark:text-white": "",
        },
        ".theme-feedback-filter-answer-unchecked": {
          "@apply text-gray-500 dark:text-gray-300": "",
        },
        ".theme-feedback-filter-category": {
          "@apply text-gray-500 dark:text-gray-300": "",
        },
        ".theme-feedback-filter-search": {
          "@apply text-gray-500 dark:text-gray-400": "",
        },
        ".theme-feedback-filter-search-button": {
          "@apply bg-gray-800 dark:bg-gray-400": "",
        },
        ".theme-my-page-title": {
          "@apply text-gray-700 dark:text-gray-200": "",
        },
        ".theme-my-profile-name": {
          "@apply text-gray-700 dark:text-gray-200": "",
        },
        ".theme-my-profile-email": {
          "@apply text-gray-500 dark:text-gray-400": "",
        },
        ".theme-my-profile-location-name": {
          "@apply text-gray-800 dark:text-gray-200": "",
        },
        ".theme-my-profile-location-address": {
          "@apply text-gray-500 dark:text-gray-400": "",
        },
        ".theme-category-title": {
          "@apply text-gray-700 dark:text-gray-200": "",
        },
        ".theme-label": {
          "@apply text-gray-500 dark:text-gray-300": "",
        },
        ".theme-label-dark": {
          "@apply text-gray-500 dark:text-gray-400": "",
        },
        ".theme-map-bg": {
          "@apply bg-white dark:bg-gray-900": "",
        },
        ".theme-map-content-text": {
          "@apply text-gray-500 dark:text-gray-200": "",
        },
        ".theme-camera-border": {
          "@apply border-gray-400 dark:border-gray-700": "",
        },
        ".theme-login-border": {
          "@apply border-gray-300 dark:border-gray-400": "",
        },
        ".theme-feedback-subject": {
          "@apply text-gray-950 dark:text-gray-100": "",
        },
        ".theme-date-text": {
          "@apply text-gray-500 dark:text-gray-400": "",
        },
        ".theme-comment-text": {
          "@apply text-gray-500 dark:text-gray-300": "",
        },
        ".theme-header-text": {
          "@apply text-gray-700 dark:text-gray-200": "",
        },
        ".theme-hover": {
          "@apply bg-gray-200 dark:bg-gray-300 dark:text-gray-950": "",
        },
        ".theme-a2h2-title": {
          "@apply text-gray-800 dark:text-gray-100": "",
        },
        ".theme-a2h2-content": {
          "@apply text-gray-600 dark:text-gray-400": "",
        },
        ".theme-my-page-setting-icon": {
          "@apply text-gray-700 dark:text-gray-300": "",
        },
        ".theme-my-page-arrow-right-icon": {
          "@apply text-gray-700 dark:text-gray-300": "",
        },
        ".theme-my-page-arrow-left-icon": {
          "@apply text-gray-700 dark:text-gray-300": "",
        },
        ".theme-my-page-setting-toggle": {
          "@apply dark:bg-gray-700 data-[state=checked]:dark:bg-gray-200": "",
        },
        ".theme-map-deraction-search-result-box": {
          "@apply bg-white dark:bg-gray-800": "",
        },
        ".theme-map-deraction-search-result-label": {
          "@apply text-gray-500 dark:text-gray-400": "",
        },
        ".theme-map-deraction-search-result-time": {
          "@apply text-gray-600 dark:text-gray-300": "",
        },
        ".theme-map-deraction-search-result-km": {
          "@apply text-gray-500 dark:text-gray-400": "",
        },
        ".theme-map-deraction-speaker-buttton": {
          "@apply dark:bg-gray-600": "",
        },
        ".theme-map-deraction-guide-box": {
          "@apply bg-white dark:bg-gray-800": "",
        },
        ".theme-map-deraction-search-button": {
          "@apply dark:hover:text-gray-800": "",
        },
        ".theme-map-deraction-guide-finish-button": {
          "@apply dark:hover:text-gray-800": "",
        },
        ".theme-map-welfare-facilities": {
          "@apply text-gray-500 dark:text-gray-400": "",
        },
        ".theme-feedback-no-result": {
          "@apply text-gray-500 dark:text-gray-400": "",
        },
        ".theme-my-page-withdraw": {
          "@apply text-gray-500 dark:text-gray-400": "",
        },
        ".theme-my-page-logout": {
          "@apply  dark:hover:text-gray-800": "",
        },
        ".theme-auth-login-button": {
          "@apply  dark:hover:text-gray-800": "",
        },
        ".theme-auth-join-button": {
          "@apply  dark:hover:text-gray-800": "",
        },
        ".theme-auth-reset-password-button": {
          "@apply  dark:hover:text-gray-800": "",
        },
        ".theme-feedback-arrow-right-icon": {
          "@apply text-gray-700 dark:text-gray-300": "",
        },
        ".theme-feedback-meatball-icon": {
          "@apply text-gray-700 dark:text-gray-400": "",
        },
        ".theme-feedback-data-category": {
          "@apply text-gray-500 dark:text-gray-400": "",
        },
        ".theme-feedback-require-comment-text": {
          "@apply text-gray-500 dark:text-gray-300 dark:placeholder:text-gray-400":
            "",
        },
        ".theme-feedback-comment-submit-icon": {
          "@apply text-gray-600 dark:text-gray-400": "",
        },
        ".theme-home-slogan": {
          "@apply text-gray-700 dark:text-gray-100": "",
        },
        ".theme-home-description": {
          "@apply text-gray-600 dark:text-gray-100": "",
        },
        ".theme-hover-recent-path": {
          "@apply bg-gray-100 dark:bg-gray-900": "",
        },
        ".theme-hover-recent-path-star-icon": {
          "@apply outline-[#FFD500]/50 text-[#FFD500]/50 dark:text-[#FFD500] dark:outline-[#FFD500]":
            "",
        },
        ".theme-bookmarked-recent-path-star-icon": {
          "@apply outline-[#FFD500]/70 text-[#FFD500]/90 dark:text-[#FFD500]/80":
            "",
        },
        ".theme-map-search-description": {
          "@apply text-gray-700 dark:text-gray-300": "",
        },
        ".theme-feedback-search-dropdown-hover": {
          "@apply bg-gray-100 dark:text-gray-300": "",
        },
        ".theme-feedback-search-dropdown": {
          "@apply dark:text-gray-400": "",
        },
      });
    },
  ],
} satisfies Config;
