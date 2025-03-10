"use client";

import { useSearchParams } from "next/navigation";

export function useSearchParamsClient() {
  return useSearchParams();
}