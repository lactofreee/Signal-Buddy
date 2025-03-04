"use client";

import React, { useState } from "react";
import { CrossRoadSearchbar } from "@/src/components/feedback/ui/CrossRoadSearchbar";
import DropDownMenu from "@/src/components/feedback/ui/DropDownMenu";
import { ArrowLeftIcon, CheckIcon } from "@/src/components/utils/icons";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Swal from "sweetalert2";
import { IFeedbackListItem } from "@/src/types/feedback/feedbackList";
import { onCancel } from "@/src/app/api/feedback/edit/onCancelEdit";
import { updateFeedback } from "@/src/app/api/feedback/edit/updateFeedback";

export default function FeedbackEditPost({
  feedbackData,
  token,
}: {
  feedbackData: IFeedbackListItem;
  token: string;
}) {
  const { feedbackId, subject, content, category, crossroad } = feedbackData;

  const [title, setTitle] = useState<string>(subject);
  const [feedbackContent, setFeedbackContent] = useState<string>(content);
  const [feedbackCategory, setFeedbackCategory] = useState<string>(category);
  const [isSecret, setIsSecret] = useState(false);
  const [crossroadId, setCrossroadId] = useState<number>(crossroad.crossroadId);

  const router = useRouter();

  const submitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    const requestData = {
      subject: title,
      content: feedbackContent,
      category: feedbackCategory.toUpperCase(),
      secret: isSecret,
      crossroadId,
      updatedAt: new Date().toISOString(),
    };

    formData.append(
      "request",
      new Blob([JSON.stringify(requestData)], { type: "application/json" }),
    );

    Swal.fire({
      title: "게시물을 수정하시겠습니까?",
      text: "수정된 내용이 저장됩니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateFeedback(formData, feedbackId, token, router);
        Swal.fire({
          title: "수정 완료!",
          text: "게시물이 성공적으로 수정되었습니다.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="flex flex-col md:mx-auto md:w-[821px]">
      {/* 헤더 영역 */}
      <div className="flex h-10 items-center gap-1 border-b border-gray-300">
        <div
          className="cursor-pointer flex h-10 items-center gap-1"
          onClick={() => onCancel(router, feedbackId)}
        >
          <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
          <p className="text-sm font-semibold">뒤로가기</p>
        </div>
      </div>

      <form className="flex flex-col gap-4 pt-2" onSubmit={submitHandle}>
        {/* 제목 입력 */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title" className="text-sm font-medium text-gray-500">
            제목
          </Label>
          <Input
            type="text"
            className="h-12 rounded-[4px] p-4 border border-gray-300 bg-white shadow-none text-gray-500 font-medium placeholder:text-gray-400"
            placeholder="제목을 입력해주세요."
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* 피드백 유형 선택 */}
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500 font-medium">피드백 유형</p>
          <DropDownMenu addCategory={setFeedbackCategory} />
        </div>

        {/* 본문 입력 */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-500">본문</p>
          <textarea
            className="h-[409px] resize-none rounded-[4px] p-4 border border-gray-300 placeholder:text-sm placeholder:text-gray-400 text-gray-500 text-[14px]"
            placeholder="내용을 입력해주세요."
            value={feedbackContent}
            onChange={(e) => setFeedbackContent(e.target.value)}
          />
        </div>

        {/* 피드백 위치 */}
        <div className="flex flex-col gap-2">
          <CrossRoadSearchbar
            addCrossRoad={setCrossroadId}
            crossroadId={crossroadId}
          />
        </div>

        {/* 숨김처리 여부 */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-500">숨김처리</p>
          <div
            className="mb-[187px] flex cursor-pointer items-center gap-1 transition-all"
            onClick={() => setIsSecret(!isSecret)}
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-sm border-2 transition-all ${
                isSecret ? "bg-gray-500" : "bg-white"
              }`}
            >
              {isSecret && <CheckIcon className="text-white" />}
            </div>
            <span className="text-xs font-medium text-gray-500">
              관리자만 보기
            </span>
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="flex justify-end">
          <button className="mb-[72px] h-10 w-[100px] rounded-[8px] bg-teal text-sm font-semibold text-white">
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
