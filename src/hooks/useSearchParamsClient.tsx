"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function CrossroadIdFetcher({
  onCrossroadId,
}: {
  onCrossroadId: (id: string | null) => void;
}) {
  const searchParams = useSearchParams();
  const crossroadId = searchParams.get("crossroadId");

  useEffect(() => {
    // 부모 컴포넌트로 전달
    onCrossroadId(crossroadId);
  }, [searchParams]);

  return null;
}
