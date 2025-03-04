"use client";

import { HeartIcon } from "@/src/components/utils/icons";
import { Button } from "../shadcn/components/ui/button";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addLikes, deleteLikes, getLikes } from "@/src/app/api/feedback/likeButton";
import { debounce } from "lodash";

export default function FeedbackLikeButton({
  likeCount = 0,
  feedbackId,
  likeStatus = false,
}: {
  likeCount?: number;
  feedbackId: string;
  likeStatus: boolean;
}) {
  const { data: session } = useSession();
  const token = session?.user?.token;
  const queryClient = useQueryClient();

  const [isLiked, setIsLiked] = useState(likeStatus);
  const [like, setLike] = useState(likeCount);

  // ✅ async 함수를 `fetchLikes`로 따로 분리
  const fetchLikes = async () => {
    if (!token) return { count: likeCount };
    return getLikes(feedbackId, token);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["likes", feedbackId],
    queryFn: fetchLikes, // ✅ `async`를 직접 사용하지 않고 함수로 전달
    enabled: !!token,
  });

  // ✅ 데이터를 안전하게 받아오기
  const currentLikeCount = data?.count ?? likeCount;

  const { isPending, mutate } = useMutation({
    mutationFn: async (liked: boolean) => {
      if (!token) return;
      return liked ? deleteLikes(feedbackId, token) : addLikes(feedbackId, token);
    },
    onMutate: async (liked) => {
      if (!token) return;

      await queryClient.cancelQueries({ queryKey: ["likes", feedbackId] });
      const previousLikes = queryClient.getQueryData<{ count: number }>(["likes", feedbackId]);

      // ✅ 즉시 UI 업데이트
      setIsLiked(!liked);
      setLike((prev) => (liked ? prev - 1 : prev + 1));

      // ✅ React Query 캐시 업데이트
      queryClient.setQueryData(["likes", feedbackId], {
        count: liked ? Math.max((previousLikes?.count ?? likeCount) - 1, 0) : (previousLikes?.count ?? likeCount) + 1,
      });

      return { previousLikes };
    },
    onError: (_, __, context) => {
      if (context?.previousLikes) {
        queryClient.setQueryData(["likes", feedbackId], context.previousLikes);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likes", feedbackId] });
    },
  });

  const onLikeClicked = debounce(() => {
    if (!token || isPending) return;
    mutate(isLiked);
  }, 300);

  return (
    <div className="mb-1 flex justify-center">
      <Button
        variant="outline"
        className={`flex h-[30px] w-[69px] items-center justify-center gap-1 rounded-[30px] border ${
          isLiked ? "border-red-500 opacity-50" : "border-gray-400"
        }`}
        disabled={!token || isLoading || isPending}
        onClick={onLikeClicked}
      >
        <HeartIcon className={isLiked ? "text-red-500" : "text-gray-400"} />
        <p className="text-sm font-medium">{like}</p> {/* ✅ 즉시 업데이트 */}
      </Button>
    </div>
  );
}
