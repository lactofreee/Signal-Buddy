import Link from "next/link";
import { UserIcon } from "../utils/icons";

interface Feedback {
  uid: number;
  status: string;
  title: string;
  content: string;
  nickname: string;
  date: string;
}

const feedbackData: Feedback[] = [
  {
    uid: 1,
    status: "답변 후",
    title: "피드백 제목",
    content: "피드백 내용",
    nickname: "닉네임",
    date: "2025.02.20",
  },
  {
    uid: 2,
    status: "답변 후",
    title: "피드백 제목",
    content: "피드백 내용",
    nickname: "닉네임",
    date: "2025.02.20",
  },
  {
    uid: 3,
    status: "답변 전",
    title: "피드백 제목",
    content: "피드백 내용",
    nickname: "닉네임",
    date: "2025.02.20",
  },
];

function FeedbackItem({
  uid,
  status,
  title,
  content,
  nickname,
  date,
}: Feedback) {
  const statusColor = status === "답변 후" ? "bg-teal" : "bg-red";

  return (
    <div className="border-b border-gray-300 pb-6">
      <div className="flex flex-col gap-2">
        <div
          className={`flex h-[22px] w-[66px] items-center justify-center rounded-[30px] text-xs font-semibold text-white ${statusColor}`}
        >
          {status}
        </div>
        <Link href={`/feedback/${uid}`} className="flex flex-col gap-2">
          <h2 className="text-lg font-bold text-black">{title}</h2>
          <p className="text-sm font-medium text-gray-600">{content}</p>
        </Link>
      </div>
      <div className="mt-4 flex">
        <div className="outline-grey-300 mr-1 flex aspect-square w-6 items-center justify-center rounded-full bg-white outline outline-1">
          <UserIcon className="aspect-square w-4" />
        </div>
        <p className="mr-4">{nickname}</p>
        <p>{date}</p>
      </div>
    </div>
  );
}

export default function FeedbackList() {
  return (
    <>
      {feedbackData.map((feedback, index) => (
        <FeedbackItem key={index} {...feedback} />
      ))}
    </>
  );
}
