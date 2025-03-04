"use client";

import MyPlaceListEdit from "@/src/components/my-place/MyPlaceListEdit";
import { useSession } from "next-auth/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import client from "@/src/lib/api/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DropResult } from "@hello-pangea/dnd";
import { Bookmark, ReorderBody } from "@/src/types/my-place";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const page = 0;
  const size = 20;

  const {
    data: bookmarks,
    isLoading,
    isError,
    error,
  } = useQuery<Bookmark[]>({
    queryKey: ["myPlaces", session?.user?.memberId],
    queryFn: async () => {
      if (!session?.user?.memberId) return [];
      const response = await client.get(
        `/api/members/${session.user.memberId}/bookmarks`,
        { params: { page, size } },
      );
      const apiData = response.data;
      if (apiData.status === "성공") {
        return apiData.data.searchResults as Bookmark[];
      }
      throw new Error("북마크 불러오기 실패");
    },
    enabled: !!session?.user?.memberId,
  });

  const [items, setItems] = useState<Bookmark[]>([]);
  const [deletedIds, setDeletedIds] = useState<number[]>([]);

  useEffect(() => {
    if (bookmarks?.length) setItems(bookmarks);
  }, [bookmarks]);

  const deleteBookmarksMutation = useMutation({
    mutationFn: async (bookmarkIds: number[]) => {
      if (!session?.user?.memberId) return;

      await client.delete(`/api/members/${session.user.memberId}/bookmarks`, {
        params: {
          bookmarkIds: bookmarkIds.join(","),
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myPlaces", session?.user?.memberId],
      });
    },
  });

  const reorderMutation = useMutation({
    mutationFn: async (body: ReorderBody[]) => {
      if (!session?.user?.memberId) return;

      const response = await client.patch(
        `/api/members/${session.user.memberId}/bookmarks/sequence/reorder`,
        body,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myPlaces", session?.user?.memberId],
      });
    },
  });

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination || destination.index === source.index) {
      return;
    }
    const updated = Array.from(items);
    const [movedItem] = updated.splice(source.index, 1);
    updated.splice(destination.index, 0, movedItem);
    setItems(updated);
  };

  const handleDelete = (bookmarkId: number) => {
    setItems((prev) => prev.filter((item) => item.bookmarkId !== bookmarkId));
    setDeletedIds((prev) => [...prev, bookmarkId]);
  };

  const handleComplete = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (deletedIds.length > 0) {
      await deleteBookmarksMutation.mutateAsync(deletedIds);
    }

    if (items.length > 0) {
      const reorderBody = items.map((item, idx) => ({
        id: item.bookmarkId,
        targetSequence: idx + 1,
      }));
      await reorderMutation.mutateAsync(reorderBody);
    }

    router.push("/my-place");
  };

  if (status === "loading") return <div>세션 로딩중...</div>;
  if (!session) return <div>로그인 해주세요</div>;
  if (isLoading) return <div>북마크 불러오는 중...</div>;
  if (isError && error instanceof Error)
    return <div>에러가 발생했습니다: {error.message}</div>;

  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-[1240px] flex-col items-center justify-center">
        <div className="border-grey-300 flex h-10 w-full items-center justify-between border-b text-sm font-extrabold mb-5 md:mb-2">
          <p className="text-grey-700">{`홈 > 즐겨찾기`}</p>
          <button onClick={handleComplete}>완료</button>
        </div>
        <div className="flex min-h-[917px] w-full">
          <section className="flex flex-grow flex-col gap-2">
            <MyPlaceListEdit
              items={items}
              handleDragEnd={handleDragEnd}
              handleDelete={handleDelete}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
