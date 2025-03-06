"use client";

import { fetchCommentList } from "@/src/app/api/feedback/fetchCommentList";
import {
  IFeedbackCommentListProps,
  IFeedbackCommentProps,
  Comment,
} from "@/src/types/feedback/feedbackList";
import { formatDate } from "@/src/utils/formatDate";
import Image from "next/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

// 댓글 삭제 함수 (비동기 처리 및 UI 반영)
const deleteComment = async (
  commentId: number,
  feedbackId: string,
  token: string | undefined,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
) => {
  if (!token) return;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/feedbacks/${feedbackId}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to delete the comment");
    }

    // 댓글 삭제 성공 후, UI에서 해당 댓글을 제거
    setComments((prevComments: Comment[]) =>
      prevComments.filter((comment) => comment.commentId !== commentId),
    );
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};

// 댓글 삭제 처리 함수
const onDelete = (
  commentId: number,
  feedbackId: string,
  token: string | undefined,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
) => {
  Swal.fire({
    title: "정말 삭제하시겠습니까?",
    text: "삭제된 댓글은 복구할 수 없습니다.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "삭제",
    cancelButtonText: "취소",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteComment(commentId, feedbackId, token, setComments);
      Swal.fire({
        title: "삭제",
        text: "댓글이 삭제되었습니다.",
        icon: "success",
      });
    }
  });
};

// 개별 댓글 아이템 컴포넌트
function FeedbackCommentItem({
  userId,
  commentItem,
  feedbackId,
  comments,
  setComments,
}: IFeedbackCommentProps) {
  const { commentId, content, createdAt, member } = commentItem;
  const author = member?.memberId;
  const session = useSession();
  const user = session.data?.user.memberId;
  const token = session.data?.user.token;

  return (
    <article
      className="flex justify-between pb-[9px] text-sm theme-line border-b"
      aria-labelledby={`comment-${commentId}`}
    >
      <div className="flex flex-col gap-2">
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
              className="font-semibold theme-nickname"
            >
              {member.nickname}
            </p>
          </div>
        </div>
        <p className="theme-content-text">{content}</p>
        <p className="text-xs theme-date-text">{formatDate(createdAt)}</p>
      </div>
      {user === author && (
        <button
          className="bg-transparent theme-content-text-dark shadow-none px-2"
          onClick={
            () => onDelete(commentId, feedbackId, token, setComments) // 댓글 삭제 호출
          }
        >
          삭제
        </button>
      )}
    </article>
  );
}

// 댓글 리스트 컴포넌트
export default function FeedbackCommentList({
  id,
  userId,
}: IFeedbackCommentListProps) {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => fetchCommentList(id),
  });

  const [comments, setComments] = useState<Comment[]>(
    data?.data?.searchResults ?? [],
  );

  // 데이터가 변경될 때 상태 업데이트 (최초 마운트 또는 새 데이터 요청 시)
  useEffect(() => {
    if (data?.data?.searchResults) {
      setComments(data.data.searchResults);
    }
  }, [data]);

  if (isLoading)
    return <p className="text-center text-gray-500">댓글을 불러오는 중...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">
        댓글을 불러오는 중 오류가 발생했습니다.
      </p>
    );

  return (
    <section
      className="mt-5 w-full rounded-[20px] theme-content-bg px-2 py-3 h-auto"
      aria-label="댓글 리스트"
    >
      <div className="flex flex-col gap-2">
        {comments.length > 0 ? (
          comments.map((commentItem) => (
            <FeedbackCommentItem
              key={commentItem.commentId}
              commentItem={commentItem}
              userId={userId}
              feedbackId={id}
              comments={comments}
              setComments={setComments}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">아직 답변이 없습니다.</p>
        )}
      </div>
    </section>
  );
}
