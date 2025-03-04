"use client";

import React, { useState } from "react";
import { PaperAirplaneIcon } from "../utils/icons";
import FeedbackCommentList from "./FeedbackCommentList";

import { Input } from "@/components/ui/input";

export default function FeedbackComment({
  id,
  userId,
  token,
}: {
  id: string;
  userId: number | null;
  token: string;
}) {
  const [newComment, setNewComment] = useState<string>();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
    console.log(newComment);
  };

  return (
    <>
      <div className="mt-5 flex w-full justify-between rounded-[20px] bg-white px-2 py-1 items-center">
        <Input
          placeholder="답변을 입력해주세요."
          className="w-full pl-3 text-xs font-semibold text-gray-500 outline-none border-none shadow-none focus:border-none"
          value={newComment}
          onChange={(e) => onInputChange(e)}
        />
        <PaperAirplaneIcon />
        {/* <input
          placeholder="답변을 입력해주세요."
          className="w-full pl-3 text-xs font-semibold text-gray-500 outline-none"
        />
        <PaperAirplaneIcon /> */}
      </div>

      {/* 댓글 목록 */}
      <FeedbackCommentList id={id} userId={userId} />
    </>
  );
}
