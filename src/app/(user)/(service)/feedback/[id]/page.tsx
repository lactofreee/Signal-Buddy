import Image from "next/image";
import Link from "next/link";

import MeatballMenu from "@/src/components/feedback/MeatballMenu";
import { auth } from "@/src/auth";
import { fetchDataFeedbackItem } from "@/src/app/api/feedback/fetchFeedbackItem";
import { ArrowLeftIcon } from "@/src/components/utils/icons";
import { IFeedbackDetailResponse } from "@/src/types/feedback/feedbackList";

import { formatDate } from "@/src/utils/formatDate";
import FeedbackComment from "@/src/components/feedback/FeedbackComment";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { formatFeedbackCategory } from "@/src/utils/formatFeedbackCategory";
import Profile from "@/src/components/common/profile/Profile";
import LikeBTN from "@/src/components/feedback/LikeBTN";

const handleError = (error: unknown) => {
  if (error instanceof Response) {
    if (error.status === 401) {
      toast.error("세션이 만료되었습니다. 다시 로그인해주세요.");
      redirect("/login");
    }
  } else if (error instanceof Error) {
    toast.error("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
  } else {
    toast.error("알 수 없는 오류가 발생했습니다.");
  }
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const user = session?.user;

  // let isLiked = false;
  let res: IFeedbackDetailResponse | null = null;

  // 피드백 데이터 요청
  try {
    res = await fetchDataFeedbackItem(id);
  } catch (error: unknown) {
    console.error("피드백 데이터 불러오기 실패:", error);
    handleError(error); // 에러 처리 함수 호출
  }

  const feedbackData = res?.data;
  if (!feedbackData) {
    return <div>피드백 데이터가 없습니다.</div>; // 피드백 데이터가 없을 때 처리
  }

  const {
    member,
    category,
    imageUrl,
    subject,
    createdAt,
    content,
    crossroad,
    likeCount,
  } = feedbackData;
  const isCompleted = feedbackData.answerStatus === "COMPLETION";
  const authorId = member.memberId;

  return (
    <div className="flex justify-center">
      <div className="max-w-[1240px] w-full">
        {/* 헤더 영역 */}
        <div className="flex h-10 items-center justify-between border-b theme-line">
          <Link href={`/feedback`} className="flex items-center gap-1">
            <span className="theme-feedback-arrow-right-icon">
              <ArrowLeftIcon className="h-6 w-6 " />
            </span>
            <div
              className={`flex h-[22px] w-[66px] items-center justify-center rounded-[30px] 
    ${isCompleted ? "bg-teal" : "bg-red"} text-xs font-semibold text-white`}
            >
              {isCompleted ? "답변 후" : "답변 전"}
            </div>
          </Link>
          <span className="theme-feedback-meatball-icon">
            <MeatballMenu feedbackId={id} authorId={authorId!} />
          </span>
        </div>

        {/* 본문 영역 */}
        <div className="pt-2">
          <div className="w-full rounded-[20px] theme-content-bg px-5 py-3 pt-6">
            {/* 본문 헤더 */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Profile src={member.profileImageUrl} size="2md" />

                <div className="flex flex-col justify-center text-xs font-medium">
                  <p className="theme-nickname">{member.nickname}</p>
                  <p className="theme-email">{member.email}</p>
                </div>
              </div>
              <div className="font-semibold theme-feedback-data-category">
                {formatFeedbackCategory(category)}
              </div>
            </div>

            {/* 본문 메인 */}
            <div className="mt-4">
              {/* 이미지 영역 */}
              {imageUrl && (
                <div className="flex justify-center">
                  <div className="w-full max-w-[393px] h-[400px] relative">
                    <Image
                      src={imageUrl}
                      alt="게시물 이미지 영역입니다."
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                </div>
              )}
              <h1 className="mb-2 text-lg font-bold theme-feedback-subject">
                {subject}
              </h1>
              <p className="mb-4 text-xs font-medium theme-date-text">
                {formatDate(String(createdAt))}
              </p>
              <p className="mb-10 theme-content-text">{content}</p>

              {/* 지도 표시 */}
              <Link href={`/map?crossroadId=${crossroad.crossroadId}`}>
                <div className="mb-4 flex h-[100px] items-center gap-[13px] border-y theme-line pb-[6px] pt-[10px]">
                  <p className="text-sm font-bold theme-content-text">
                    {crossroad.name}
                  </p>
                </div>
              </Link>

              <LikeBTN feedbackId={id} session={session} />
            </div>
          </div>
        </div>

        {/* 댓글 영역 */}
        <FeedbackComment id={id} user={user} />
      </div>
    </div>
  );
}
