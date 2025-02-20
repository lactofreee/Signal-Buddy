"use client";

import { AdjustmentsIcon } from "../utils/icons";
import useToolbarStore from "@/src/store/feedback/useToolbarStore";

export default function MobileToolbarHandleButton() {
  const { isMobileToolbarOpen, toggleMobileToolbar } = useToolbarStore();

  return (
    <div>
      <button
        className={`rounded-[8px] ${isMobileToolbarOpen ? "bg-gray-300" : ""}`}
        onClick={toggleMobileToolbar}
      >
        <AdjustmentsIcon />
      </button>
    </div>
  );
}
