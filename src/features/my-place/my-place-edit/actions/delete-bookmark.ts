/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "@/src/lib/api/client";

export const deleteBookmark = (memberId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookmarkIds: number[]) => {
      if (!memberId) return;
      await client.delete(`/api/members/${memberId}/bookmarks`, {
        params: { bookmarkIds: bookmarkIds.join(",") },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPlaces", memberId] });
    },
  });
};
