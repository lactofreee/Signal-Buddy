import Image from "next/image";
import Link from "next/link";

import MeatballMenu from "@/src/components/feedback/MeatballMenu";
import FeedbackCommentList from "@/src/components/feedback/FeedbackCommentList";
import { auth } from "@/src/auth";
import { fetchDataFeedbackItem } from "@/src/app/api/feedback/fetchFeedbackItem";
import {
  ArrowLeftIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@/src/components/utils/icons";
import { IFeedbackDetailResponse } from "@/src/types/feedback/feedbackList";
import FeedbackLikeButton from "@/src/components/feedback/FeedbackLikeButton";
import { gerIsLiked } from "@/src/app/api/feedback/likeButton";
import { formatDate } from "@/src/utils/formatDate";
import FeedbackComment from "@/src/components/feedback/FeedbackComment";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const user = session?.user;
  const TOKEN = session?.user.token;
  const userId = session?.user.memberId || null;

  let isLiked = false;
  let res: IFeedbackDetailResponse | null = null;

  if (TOKEN) {
    res = await fetchDataFeedbackItem(id, TOKEN);
    isLiked = await gerIsLiked(id, TOKEN);
  }

  const feedbackData = res?.data;
  console.log("이미지: ", feedbackData?.imageUrl);

  return (
    <div className="">
      {TOKEN ? (
        <div>
          {/* 헤더 영역 */}
          <div className="flex h-10 items-center justify-between border-b theme-line">
            <Link href={`/feedback`} className="flex items-center gap-1">
              <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
              <div
                className={`flex h-[22px] w-[66px] items-center justify-center rounded-[30px] bg-teal text-xs font-semibold text-white`}
              >
                {feedbackData?.answerStatus === "COMPLETION"
                  ? "답변 전"
                  : "답변 후"}
              </div>
            </Link>
            <MeatballMenu id={id} />
          </div>
          {/* 본문 영역 */}
          <div className="pt-2">
            <div className="w-full rounded-[20px] theme-content-bg px-2 py-3">
              {/* 본문 헤더 */}
              <div className="flex items-center justify-between">
                <div className="flex">
                  <div className="mr-2 flex aspect-square w-[38px] items-center justify-center overflow-hidden rounded-full border border-gray-300">
                    <Image
                      src={feedbackData?.member.profileImageUrl as string}
                      alt="User profile image"
                      width={30}
                      height={30}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center text-xs font-medium">
                    <p className="theme-nickname">
                      {feedbackData?.member.nickname}
                    </p>
                    <p className="theme-email">{feedbackData?.member.email}</p>
                  </div>
                </div>
                <div className="font-semibold text-gray-500">
                  {feedbackData?.category}
                </div>
              </div>
              {/* 본문 메인 */}
              <div className="mt-4">
                {/* 이미지 영역 */}
                {feedbackData?.imageUrl && (
                  <div className="flex justify-center">
                    <div className="w-full max-w-[393px] h-[400px] relative">
                      <Image
                        src={feedbackData?.imageUrl}
                        alt="게시물 이미지 영역입니다."
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                  </div>
                )}
                <h1 className="mb-2 text-lg font-bold theme-feedback-subject">
                  {feedbackData?.subject}
                </h1>
                <p className="mb-4 text-xs font-medium theme-date-text">
                  {formatDate(String(feedbackData?.createdAt))}
                </p>
                <p className="mb-10 theme-content-text">
                  {feedbackData?.content}
                </p>
                {/* 지도 표시 */}
                <div className="mb-4 flex h-[100px] items-center gap-[13px] border-y theme-line pb-[6px] pt-[10px]">
                  <div className="aspect-square w-[84px] rounded-2xl bg-teal"></div>
                  <p className="text-sm font-bold theme-content-text">
                    {feedbackData?.crossroad.name}
                  </p>
                </div>
                <FeedbackLikeButton
                  feedbackId={id}
                  likeCount={feedbackData?.likeCount ?? 0}
                  likeStatus={isLiked}
                />
              </div>
            </div>
          </div>
          {/* 댓글 입력창 */}
          <FeedbackComment id={id} user={user} />
        </div>
      ) : (
        <div>로그인 후 사용하세용</div>
      )}
    </div>
  );
}
