import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        white: "#FFFFFF",
        black: "#000000",
        red: "#FF6156",
        yellow: "#FFBD2B",
        green: "#2CCA3E",
        teal: "#8DB4AF",
        pink: "#FFE4E9",
        gray: {
          100: "#F3F3F3",
          200: "#E8E8E8",
          300: "#CED1D8",
          400: "#90A0B0",
          500: "#64748B",
          600: "#4B5563",
          700: "#3F3F46",
          800: "#27272A",
          900: "#18181B",
          950: "#09090B",
        },
      },
      fontFamily: {
        Pretendard: ["Pretendard"],
      },
    },
  },
  plugins: [],
} satisfies Config;
