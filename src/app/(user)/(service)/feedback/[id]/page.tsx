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

  return (
    <div className="">
      {TOKEN ? (
        <div>
          {/* 헤더 영역 */}
          <div className="flex h-10 items-center justify-between border-b border-gray-300">
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
            <div className="w-full rounded-[20px] bg-white px-2 py-3">
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
                    <p className="text-gray-700">
                      {feedbackData?.member.nickname}
                    </p>
                    <p className="text-gray-500">
                      {feedbackData?.member.email}
                    </p>
                  </div>
                </div>
                <div className="font-semibold text-gray-500">
                  {feedbackData?.category}
                </div>
              </div>
              {/* 본문 메인 */}
              <div className="mt-4">
                <h1 className="mb-2 text-lg font-bold text-gray-950">
                  {feedbackData?.subject}
                </h1>
                <p className="mb-4 text-xs font-medium text-gray-500">
                  {formatDate(String(feedbackData?.createdAt))}
                </p>
                <p className="mb-10 text-gray-600">{feedbackData?.content}</p>
                {/* 지도 표시 */}
                <div className="mb-4 flex h-[100px] items-center gap-[13px] border-y border-gray-300 pb-[6px] pt-[10px]">
                  <div className="aspect-square w-[84px] rounded-2xl bg-teal"></div>
                  <p className="text-sm font-bold text-gray-600">
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

          {/* <div className="mt-5 flex w-full justify-between rounded-[20px] bg-white px-2 py-3">
            <input
              placeholder="답변을 입력해주세요."
              className="w-full pl-3 text-xs font-semibold text-gray-500 outline-none"
            />
            <PaperAirplaneIcon />
          </div>
          {/* 댓글 목록 */}
          {/* <FeedbackCommentList id={id} userId={userId} />  */}
        </div>
      ) : (
        <div>로그인 후 사용하세용</div>
      )}
    </div>
  );
}
