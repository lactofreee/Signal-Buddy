import MeatballMenu from "@/src/components/feedback/MeatballMenu";
import {
  ArrowLeftIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@/src/components/utils/icons";
import Image from "next/image";
import Link from "next/link";
import user_img from "@/public/imgs/DefaultProfile.png";
import FeedbackCommentList from "@/src/components/feedback/FeedbackCommentList";
import { IFeedbackCommentProps } from "@/src/types/feedback";

export default function Page() {
  const feedbackComments: IFeedbackCommentProps[] = [
    {
      uid: "1",
      content: "이 피드백 정말 유익하네요! 많은 도움이 되었습니다.",
      username: "user123",
      user_profile: "https://randomuser.me/api/portraits/men/1.jpg",
      created_at: new Date("2025-02-15T14:23:00"),
      is_admin: false,
    },
    {
      uid: "2",
      content: "궁금한 점이 있습니다. 추가적으로 설명 부탁드립니다!",
      username: "curious_cat",
      user_profile: "https://randomuser.me/api/portraits/women/2.jpg",
      created_at: new Date("2025-02-16T09:45:00"),
      is_admin: false,
    },
    {
      uid: "3",
      content: "관리자입니다. 해당 내용은 수정되었습니다. 감사합니다.",
      username: "admin",
      user_profile: "https://randomuser.me/api/portraits/men/3.jpg",
      created_at: new Date("2025-02-18T12:00:00"),
      is_admin: true,
    },
    {
      uid: "4",
      content: "좋은 피드백 감사합니다. 앞으로 더 노력하겠습니다!",
      username: "dev_guru",
      user_profile: "https://randomuser.me/api/portraits/men/4.jpg",
      created_at: new Date("2025-02-19T18:30:00"),
      is_admin: false,
    },
  ];

  return (
    <div className="">
      {/* 헤더 영역 */}
      <div className="flex h-10 items-center justify-between border-b border-gray-300">
        <Link href={`/feedback`} className="flex items-center gap-1">
          <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
          <div
            className={`flex h-[22px] w-[66px] items-center justify-center rounded-[30px] bg-teal text-xs font-semibold text-white`}
          >
            답변 후
          </div>
        </Link>
        <MeatballMenu />
      </div>
      {/* 본문 영역 */}
      <div className="pt-2">
        <div className="w-full rounded-[20px] bg-white px-2 py-3">
          {/* 본문 헤더 */}
          <div className="flex items-center justify-between">
            <div className="flex">
              <div className="mr-2 flex aspect-square w-[38px] items-center justify-center overflow-hidden rounded-full border border-gray-300">
                <Image
                  src={user_img}
                  alt="User profile image"
                  width={30}
                  height={30}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center text-xs font-medium">
                <p className="text-gray-700">닉네임</p>
                <p className="text-gray-500">example@gmail.com</p>
              </div>
            </div>
            <div className="font-semibold text-gray-500">오작동</div>
          </div>
          {/* 본문 메인 */}
          <div className="mt-4">
            <h1 className="mb-2 text-lg font-bold text-gray-950">Title</h1>
            <p className="mb-4 text-xs font-medium text-gray-500">2025.02.20</p>
            <p className="mb-10 text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Assumenda, reprehenderit illum voluptates aliquam vero minima
              laudantium a aliquid accusamus voluptatem optio sapiente quia
              dignissimos nobis quisquam earum accusantium fugiat. Quasi.
            </p>
            {/* 지도 표시 */}
            <div className="mb-4 flex h-[100px] items-center gap-[13px] border-y border-gray-300 pb-[6px] pt-[10px]">
              <div className="aspect-square w-[84px] rounded-2xl bg-teal"></div>
              <p className="text-sm font-bold text-gray-600">신고된 위치</p>
            </div>
            <div className="mb-1 flex justify-center">
              <div className="flex h-[30px] w-[69px] items-center justify-center gap-1 rounded-[30px] border border-gray-400">
                <HeartIcon />
                <p className="text-sm font-medium text-gray-400">00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 댓글 입력창 */}
      <div className="mt-5 flex w-full justify-between rounded-[20px] bg-white px-2 py-3">
        <input
          placeholder="답변을 입력해주세요."
          className="w-full pl-3 text-xs font-semibold text-gray-500 outline-none"
        />
        <PaperAirplaneIcon />
      </div>
      {/* 댓글 목록 */}
      <FeedbackCommentList comments={feedbackComments} />
    </div>
  );
}
