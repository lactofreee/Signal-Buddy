"use client";

import MyPlaceEditList from "@/src/features/my-place/my-place-edit/components/my-place-edit-list";
import { useSession } from "next-auth/react";
import { useState } from "react";
import MyPlacePagination from "@/src/features/my-place/my-place-common/components/my-place-pagination";
import { myPlaceBookmarkQuery } from "@/src/features/my-place/my-place-common/queries/my-place-bookmark-query";
import { useMyPlaceEdit } from "@/src/hooks/use-my-place-edit";

export default function MyPlaceEdit() {
  const { data: session, status } = useSession();
  const [page, setPage] = useState(0);
  const size = 15;

  const {
    data: bookmarks = { searchResults: [], totalPages: 1 },
    isLoading,
    isError,
    error,
  } = myPlaceBookmarkQuery(session?.user?.memberId, page);

  const { searchResults, totalPages } = bookmarks;

  const { items, handleDragEnd, handleDelete, handleComplete, persistChanges } =
    useMyPlaceEdit(searchResults, session?.user?.memberId, page, size);

  const handlePageChange = async (newPage: number) => {
    await persistChanges();
    setPage(newPage);
  };

  if (status === "loading") return <div>세션 로딩중...</div>;
  if (!session) return <div>로그인 해주세요</div>;
  if (isLoading) return <div>북마크 불러오는 중...</div>;
  if (isError && error instanceof Error)
    return <div>에러가 발생했습니다: {error.message}</div>;

  return (
    <>
      <div className="theme-line flex h-10 w-full items-center justify-between border-b text-sm font-extrabold mb-5 md:mb-2">
        <p className="theme-header-text">{`홈 > 즐겨찾기`}</p>
        <button onClick={handleComplete}>완료</button>
      </div>
      <div className="flex min-h-[916px] w-full">
        <section className="flex flex-grow flex-col gap-2">
          <MyPlaceEditList
            items={items}
            handleDragEnd={handleDragEnd}
            handleDelete={handleDelete}
          />
          <MyPlacePagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </section>
      </div>
    </>
  );
}
