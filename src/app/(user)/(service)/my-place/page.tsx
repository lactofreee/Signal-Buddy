"use client";

import MyPlaceList from "@/src/components/my-place/MyPlaceList";
import Link from "next/link";
import { Bookmark } from "@/src/types/my-place";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import client from "@/src/lib/api/client";

type MyPlacesResponse = {
  searchResults: Bookmark[];
  totalPages: number;
};

export default function Page() {
  const { data: session } = useSession();
  const [page, setPage] = useState(0);
  const size = 15;

  const {
    data: bookmarks = { searchResults: [], totalPages: 1 },
    isLoading,
    isError,
    error,
  } = useQuery<MyPlacesResponse>({
    queryKey: ["myPlaces", session?.user?.memberId, page],
    queryFn: async () => {
      if (!session?.user?.memberId)
        return {
          searchResults: [],
          totalPages: 1,
        };

      const response = await client.get(
        `/api/members/${session.user.memberId}/bookmarks`,
        {
          params: { page, size },
        },
      );

      if (response.data.status === "성공") {
        return {
          searchResults: response.data.data.searchResults,
          totalPages: response.data.data.totalPages,
        };
      }
      throw new Error("북마크 불러오기 실패");
    },
    placeholderData: keepPreviousData,
    enabled: !!session?.user?.memberId,
  });

  const { searchResults, totalPages } = bookmarks;

  useEffect(() => {
    console.log(error);
  }, [error]);
  if (isLoading) return <div>로딩 중...</div>;

  if (!session) {
    return <div>로그인 해주세요</div>;
  }

  if (isError && error instanceof Error)
    return <div>에러가 발생했습니다: {error.message}</div>;

  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-[1240px] flex-col items-center justify-center">
        <div className="theme-line flex h-10 w-full items-center justify-between border-b text-sm font-extrabold mb-5 md:mb-2">
          <div className="flex">
            <p className="theme-header-text">{`홈 > 즐겨찾기`}</p>
          </div>
          <Link href={`/my-place/edit`} className="theme-header-text">
            편집
          </Link>
        </div>
        <div className="flex min-h-[916px] w-full">
          <section className="flex flex-grow flex-col gap-2 ">
            <MyPlaceList
              searchResults={searchResults}
              page={page}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
