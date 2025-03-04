"use client";

import { useSession } from "next-auth/react";
import client from "@/src/lib/api/client";
import MyPlaceItem from "./MyPlaceItem";
import { useQuery } from "@tanstack/react-query";
import { Bookmark } from "@/src/types/my-place";

export default function MyPlaceList() {
  const { data: session } = useSession();

  const page = 0;
  const size = 20;

  const {
    data: bookmarks = [],
    isLoading,
    isError,
    error,
  } = useQuery<Bookmark[]>({
    queryKey: ["myPlaces", session?.user?.memberId],
    queryFn: async () => {
      if (!session?.user?.memberId) return [];

      const response = await client.get(
        `/api/members/${session.user.memberId}/bookmarks`,
        {
          params: { page, size },
        },
      );
      const apiData = response.data;
      if (apiData.status === "성공") {
        return apiData.data.searchResults as Bookmark[];
      }
      throw new Error("북마크 불러오기 실패");
    },
    enabled: !!session?.user?.memberId,
  });

  if (isLoading) return <div>로딩 중...</div>;

  if (!session) {
    return <div>로그인 해주세요</div>;
  }

  if (isError && error instanceof Error)
    return <div>에러가 발생했습니다: {error.message}</div>;

  return (
    <div className="space-y-2">
      {bookmarks.map((item) => (
        <MyPlaceItem
          key={item.bookmarkId}
          name={item.name}
          address={item.address}
        />
      ))}
    </div>
  );
}
