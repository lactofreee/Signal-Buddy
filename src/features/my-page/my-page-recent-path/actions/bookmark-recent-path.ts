import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "@/src/lib/api/client";
import { Destination } from "@/src/features/my-page/my-page-recent-path/index";
import { useSession } from "next-auth/react";

export const bookmarkRecentPath = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const memberId = session?.user?.memberId;

  const updateCache = (recentPathId: number, value: boolean) => {
    const previousPaths = queryClient.getQueryData<Destination[]>([
      "recentPaths",
      memberId,
    ]);
    if (previousPaths) {
      const newData = previousPaths.map((item) =>
        item.recentPathId === recentPathId
          ? { ...item, bookmarked: value }
          : item,
      );
      queryClient.setQueryData(["recentPaths", memberId], newData);
    }
  };

  const add = useMutation({
    mutationFn: async (recentPathId: number) => {
      await client.post(`/api/recent-path/${recentPathId}/bookmarks`, {
        memberId,
      });
    },
    onMutate: async (recentPathId) => {
      await queryClient.cancelQueries({ queryKey: ["recentPaths", memberId] });
      updateCache(recentPathId, true);
    },
    onError: (_, recentPathId, context) => {
      updateCache(recentPathId, false);
      alert("북마크 추가에 실패했습니다.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["recentPaths", memberId] });
    },
  });

  const remove = useMutation({
    mutationFn: async (recentPathId: number) => {
      await client.delete(`/api/recent-path/${recentPathId}/bookmarks`);
    },
    onMutate: async (recentPathId) => {
      await queryClient.cancelQueries({ queryKey: ["recentPaths", memberId] });
      updateCache(recentPathId, false);
    },
    onError: (_, recentPathId, context) => {
      updateCache(recentPathId, true);
      alert("북마크 제거에 실패했습니다.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["recentPaths", memberId] });
    },
  });

  return { add, remove };
};
