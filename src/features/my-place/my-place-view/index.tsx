"use client";

import MyPlaceList from "@/src/features/my-place/my-place-view/components/my-place-list";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { myPlaceBookmarkQuery } from "@/src/features/my-place/my-place-common/queries/my-place-bookmark-query";

export default function MyPlaceView() {
  const { data: session } = useSession();
  const [page, setPage] = useState(0);

  const {
    data: bookmarks = { searchResults: [], totalPages: 1 },
    isLoading,
    isError,
    error,
  } = myPlaceBookmarkQuery(session?.user?.memberId, page);

  const { searchResults, totalPages } = bookmarks;

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  if (isLoading) return <div>로딩 중...</div>;
  if (!session) return <div>로그인 해주세요</div>;
  if (isError && error instanceof Error)
    return <div>에러가 발생했습니다: {error.message}</div>;

  return (
    <>
      <div className="theme-line flex h-10 w-full items-center justify-between border-b text-sm font-extrabold mb-5 md:mb-2">
        <p className="theme-header-text">{`홈 > 즐겨찾기`}</p>
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
    </>
  );
}
