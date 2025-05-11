import { useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "@/src/lib/api/client";
import { toast } from "sonner";
import { newPlaceNameSchema } from "@/src/features/my-place/my-place-edit/actions/rename-schema";
import { Bookmark } from "@/src/types/my-place";

export function useMyPlaceNameChange(
  bookmark: Bookmark,
  onSuccess?: () => void,
) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [newName, setNewName] = useState("");

  const schema = newPlaceNameSchema(bookmark.name);

  const mutation = useMutation({
    mutationFn: async (newName: string) => {
      if (!session?.user?.memberId) return;
      const body = {
        lng: bookmark.lng,
        lat: bookmark.lat,
        address: bookmark.address,
        name: newName,
      };
      const response = await client.patch(
        `/api/members/${session.user.memberId}/bookmarks/${bookmark.bookmarkId}`,
        body,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myPlaces", session?.user?.memberId],
      });
      toast.success("장소명이 변경되었습니다.");
      onSuccess?.();
    },
    onError: () => {
      toast.error("장소명 변경 중 오류가 발생했습니다.");
    },
  });

  const handleSave = () => {
    const result = schema.safeParse({ placeName: newName });
    if (!result.success) {
      const errorMsg =
        result.error.issues[0]?.message || "유효하지 않은 입력입니다.";
      toast.error(errorMsg);
      return;
    }
    mutation.mutate(newName);
  };

  return {
    newName,
    setNewName,
    handleSave,
  };
}
