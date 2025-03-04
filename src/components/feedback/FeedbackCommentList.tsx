"use client";

import { fetchCommentList } from "@/src/app/api/feedback/fetchCommentList";
import {
  IFeedbackCommentListProps,
  IFeedbackCommentListResponse,
  IFeedbackCommentProps,
} from "@/src/types/feedback/feedbackList";
import { formatDate } from "@/src/utils/formatDate";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

function FeedbackComment({ userId, commentItem }: IFeedbackCommentProps) {
  const { commentId, content, createdAt, member } = commentItem;
  const author = member?.memberId;

  return (
    <article
      className="flex flex-col gap-2 pb-[9px] text-sm"
      aria-labelledby={`comment-${commentId}`}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <Image
            className="rounded-full outline outline-1 outline-gray-300"
            src={member.profileImageUrl}
            width={24}
            height={24}
            alt={`${member.nickname}님의 프로필 이미지`}
          />
          <p
            id={`comment-${commentId}`}
            className="font-semibold text-gray-700"
          >
            {member.nickname}
          </p>
        </div>
        {userId === author && (
          <button className="text-xs font-semibold text-gray-500">삭제</button>
        )}
      </div>
      <p className="text-gray-600">{content}</p>
      <p className="text-xs text-gray-500">{formatDate(createdAt)}</p>
    </article>
  );
}

export default function FeedbackCommentList({ id, userId }: IFeedbackCommentListProps) {
  // ✅ `useQuery`를 사용하여 비동기 데이터 가져오기
  const { data, isLoading, error } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => fetchCommentList(id),
  });

  const comments = data?.data?.searchResults ?? [];

  if (isLoading) return <p className="text-center text-gray-500">댓글을 불러오는 중...</p>;
  if (error) return <p className="text-center text-red-500">댓글을 불러오는 중 오류가 발생했습니다.</p>;

  return (
    <section
      className="mt-5 w-full rounded-[20px] bg-white px-2 py-3"
      aria-label="댓글 리스트"
    >
      <div className="flex flex-col gap-2">
        {comments.length > 0 ? (
          comments.map((commentItem) => (
            <FeedbackComment
              key={commentItem.commentId}
              commentItem={commentItem}
              userId={userId}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">아직 댓글이 없습니다.</p>
        )}
      </div>
    </section>
  );
}
