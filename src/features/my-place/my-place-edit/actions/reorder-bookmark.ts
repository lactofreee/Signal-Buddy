/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "@/src/lib/api/client";
import { ReorderBody } from "@/src/types/my-place";

export const reorderBookmark = (memberId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: ReorderBody[]) => {
      if (!memberId) return;
      return await client.patch(
        `/api/members/${memberId}/bookmarks/sequence/reorder`,
        body,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPlaces", memberId] });
    },
  });
};
