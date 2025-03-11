"use client";

import { HeartIcon } from "@/src/components/utils/icons";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addLikes,
  deleteLikes,
  getLikes,
} from "@/src/app/api/feedback/likeButton";
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

  const fetchLikes = async () => {
    if (!token) return { count: likeCount };
    return getLikes(feedbackId, token);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["likes", feedbackId],
    queryFn: fetchLikes,
    enabled: !!token,
  });

  const currentLikeCount = data?.count ?? likeCount;

  const { isPending, mutate } = useMutation({
    mutationFn: async (liked: boolean) => {
      if (!token) return;
      return liked
        ? deleteLikes(feedbackId, token)
        : addLikes(feedbackId, token);
    },
    onMutate: async (liked) => {
      if (!token) return;

      await queryClient.cancelQueries({ queryKey: ["likes", feedbackId] });
      const previousLikes = queryClient.getQueryData<{ count: number }>([
        "likes",
        feedbackId,
      ]);

      setIsLiked(!liked);
      setLike((prev) => (liked ? prev - 1 : prev + 1));

      queryClient.setQueryData(["likes", feedbackId], {
        count: liked
          ? Math.max((previousLikes?.count ?? likeCount) - 1, 0)
          : (previousLikes?.count ?? likeCount) + 1,
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
      <div
        className="flex items-center gap-1 justify-center w-[68px] h-[30px] border border-gray-400 rounded-full cursor-pointer"
        onClick={onLikeClicked}
        style={{
          pointerEvents: !token || isLoading || isPending ? "none" : "auto",
        }}
        aria-label={isLiked ? "좋아요 취소" : "좋아요"}
      >
        {isLiked ? (
          <HeartIcon className="fill-red w-4" />
        ) : (
          <HeartIcon className="stroke-gray-400 fill-none w-4" />
        )}
        <p className="text-sm font-medium text-gray-400">{like}</p>
      </div>
    </div>
  );
}
