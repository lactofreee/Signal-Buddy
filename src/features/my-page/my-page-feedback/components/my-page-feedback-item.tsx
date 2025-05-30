import Link from "next/link";
import { formatDate } from "@/src/utils/formatDate";
import { IFeedbackListItem } from "@/src/types/feedback/feedbackList";
import Profile from "@/src/components/common/profile";

export default function FeedbackItem({
  feedbackId,
  answerStatus,
  subject,
  content,
  member,
  createdAt,
}: IFeedbackListItem) {
  const statusColor = answerStatus === "COMPLETION" ? "bg-teal" : "bg-red";

  return (
    <div className="border-b theme-line py-5 px-6 theme-content-bg rounded-xl">
      <div className="flex flex-col gap-2">
        <div
          className={`flex h-5 w-[66px] items-center justify-center rounded-[30px] text-xs font-semibold text-white ${statusColor}`}
        >
          {answerStatus === "COMPLETION" ? "답변 후" : "답변 전"}
        </div>
        <Link href={`/feedback/${feedbackId}`} className="flex flex-col gap-2">
          <h2 className="text-lg font-bold theme-feedback-title">{subject}</h2>
          <p className="text-sm font-medium theme-feedback-content">
            {content}
          </p>
        </Link>
      </div>
      <div className="mt-4 flex items-center gap-1 theme-feedback-user text-xs font-medium">
        <Profile src={member.profileImageUrl} size="sm" />

        <p className="mr-2">{member.nickname}</p>
        <p>{formatDate(createdAt)}</p>
      </div>
    </div>
  );
}
