import Link from "next/link";
import { formatDate } from "@/src/utils/formatDate";
import Image from "next/image";

function FeedbackItem({
  feedbackId,
  answerStatus,
  subject,
  content,
  member,
  createdAt,
}: IFeedbackListItem) {
  const statusColor = answerStatus === "COMPLETION" ? "bg-teal" : "bg-red";

  return (
    <div className="border-b border-gray-300 pb-6">
      <div className="flex flex-col gap-2">
        <div
          className={`flex h-[22px] w-[66px] items-center justify-center rounded-[30px] text-xs font-semibold text-white ${statusColor}`}
        >
          {answerStatus === "COMPLETION" ? "답변 후" : "답변 전"}
        </div>
        <Link href={`/feedback/${feedbackId}`} className="flex flex-col gap-2">
          <h2 className="text-lg font-bold text-black">{subject}</h2>
          <p className="text-sm font-medium text-gray-600">{content}</p>
        </Link>
      </div>
      <div className="mt-4 flex items-center gap-1 text-gray-500 text-xs font-medium">
        <Image
          src={member?.profileImageUrl || "/default-profile.png"}
          alt="작성자 프로필 이미지입니다."
          width={24}
          height={24}
          className="rounded-full"
        />

        <p className="mr-2">{member.nickname}</p>
        <p>{formatDate(createdAt)}</p>
      </div>
    </div>
  );
}

export default function FeedbackList({
  feedbackList,
}: {
  feedbackList: IFeedbackListItem[];
}) {
  
  return (
    <>
      {feedbackList.map((feedbackListItem, index) => (
        <FeedbackItem key={index} {...feedbackListItem} />
      ))}
    </>
  );
}
