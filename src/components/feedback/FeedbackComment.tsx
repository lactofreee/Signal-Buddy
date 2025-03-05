"use client";

import React, { useState } from "react";
import { PaperAirplaneIcon } from "../utils/icons";
import FeedbackCommentList from "./FeedbackCommentList";

import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { User } from "@/src/types/feedback/feedbackList";
import { useQueryClient } from "@tanstack/react-query";

interface ITempComment {
  commentId: number; // Date.now()는 숫자 반환
  content: string;
  createdAt: string; // toISOString()은 문자열 반환
  member: {
    memberId: string;
    nickname: string;
    profileImageUrl?: string;
  };
}

interface Member {
  memberId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  role: string;
  memberStatus: string;
}

interface Comment {
  commentId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  member: Member;
}

interface PaginatedResponse {
  status: string;
  message: string | null;
  data: {
      totalElements: number;
      totalPages: number;
      currentPageNumber: number;
      pageSize: number;
      hasNext: boolean;
      hasPrevious: boolean;
      searchResults: Comment[];
  };
}


export default function FeedbackComment({
  id,
  user,
}: {
  id: string;
  user: User | undefined;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState<string>("");

  const addNewComment = (newComment: ITempComment) => {
    queryClient.setQueryData(["comments", id], (oldData: PaginatedResponse) => {
      console.log(oldData);
      return {
        ...oldData,
        data: {
          ...oldData.data,
          searchResults: [...oldData.data.searchResults, newComment],
        },
      };
    });
  };

  const postNewComment = async (id: string, token: string, content: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/feedbacks/${id}/comments`,
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        },
      );

      if (!res.ok) {
        throw new Error(`댓글 등록 실패: ${res.status}`);
      }

      return await res.json();
    } catch (error) {
      console.error("댓글 등록 중 오류 발생:", error);
      throw error;
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      alert("로그인 오류입니다.");
      return;
    }
    if (!newComment.trim()) {
      toast.error("댓글을 입력해주세요.");
      return;
    }

    try {
      const optimisticComment = {
        commentId: Date.now(), // 임시 ID
        content: newComment,
        createdAt: new Date().toISOString(),
        member: {
          memberId: user.id,
          nickname: user.nickname,
          profileImageUrl: user.profileImageUrl,
        },
      };

      addNewComment(optimisticComment);
      await postNewComment(id, user.token, newComment);
      setNewComment("");
      router.refresh();
    } catch (error) {
      toast.error("댓글 등록에 실패했습니다.");
    }
  };

  return (
    <>
      <form
        className="mt-5 flex w-full justify-between rounded-[20px] bg-white px-2 py-1 items-center"
        onSubmit={onSubmit}
      >
        <Input
          placeholder="답변을 입력해주세요."
          className="w-full pl-3 text-xs font-semibold text-gray-500 outline-none border-none shadow-none focus:border-none"
          value={newComment}
          onChange={onInputChange}
        />
        <button type="submit">
          <PaperAirplaneIcon />
        </button>
      </form>

      {/* 댓글 목록 */}
      <FeedbackCommentList id={id} userId={user!.id} />
    </>
  );
}
