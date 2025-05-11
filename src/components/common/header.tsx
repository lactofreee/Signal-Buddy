"use client";
import useDetectScroll, { Direction } from "@smakss/react-scroll-direction";
import { cn } from "@/src/utils";
import Navbar from "./navbar";

export default function Header() {
  const { scrollDir } = useDetectScroll();
  const getDirectionEmoji = (direction: Direction) => {
    switch (direction) {
      case Direction.Down:
        return "-top-[70px]";
      default:
        return "top-0";
    }
  };

  return (
    <header
      role="banner"
      aria-label="주요 네비게이션"
      className={cn(
        "w-full max-w-[100vw] flex h-[70px] justify-center mx-auto sticky top-0 left-0 z-[9999] items-center theme-bg transition-all",
        getDirectionEmoji(scrollDir),
      )}
    >
      <div className="w-[calc(100vw-32px)] md:w-[calc(100vw-60px)] max-w-[1240px]">
        <Navbar />
      </div>
    </header>
  );
}
