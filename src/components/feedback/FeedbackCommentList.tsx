import {
  FeedbackCommentListProps,
  IFeedbackCommentProps,
} from "@/src/types/feedback";
import Image from "next/image";

function FeedbackComment({
  uid,
  content,
  username,
  user_profile,
  created_at,
  is_admin,
  isLast,
}: IFeedbackCommentProps & { isLast: boolean }) {
  return (
    <article
      className={`flex flex-col gap-2 pb-[9px] text-sm ${
        isLast ? "" : "border-b border-gray-300"
      }`}
      aria-labelledby={`comment-${uid}`}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <Image
            className="rounded-full outline outline-1 outline-gray-300"
            src={user_profile}
            width={24}
            height={24}
            alt={`${username}님의 프로필 이미지`}
          />
          <p
            id={`comment-${uid}`}
            className="font-semibold text-gray-700"
            aria-label={`댓글 작성자: ${username}`}
          >
            {username}
          </p>
        </div>
        <button
          className="text-xs font-semibold text-gray-500"
          aria-label={`${username}님의 댓글 삭제 버튼`}
        >
          삭제
        </button>
      </div>
      <p className="text-gray-600" aria-label={`댓글 내용: ${content}`}>
        {content}
      </p>
      <p
        className="text-xs text-gray-500"
        aria-label={`작성 시간: ${new Date(created_at).toLocaleString()}`}
      >
        {new Date(created_at).toLocaleString()}
      </p>
    </article>
  );
}

export default function FeedbackCommentList({
  comments,
}: FeedbackCommentListProps) {
  return (
    <section
      className="mt-5 w-full rounded-[20px] bg-white px-2 py-3"
      aria-label="댓글 리스트"
    >
      <div className="flex flex-col gap-2">
        {comments.map((val, index) => (
          <FeedbackComment
            key={val.uid}
            uid={val.uid}
            content={val.content}
            username={val.username}
            user_profile={val.user_profile}
            created_at={val.created_at}
            is_admin={val.is_admin}
            isLast={index === comments.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
