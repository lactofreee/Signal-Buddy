import { ArrowLeftIcon } from "@/src/components/utils/icons";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-[400px] flex-col gap-5 pt-2 sm:px-4">
        <section className="flex flex-col gap-2">
          <div className="border-grey-300 flex h-10 items-center gap-2 border-b">
            <Link href="/my-page/profile">
              <ArrowLeftIcon />
            </Link>
            <h1 className="text-grey-700 text-sm font-extrabold">설정</h1>
          </div>
        </section>
        <section>
          <div className="text-grey-700 flex h-[60px] items-center justify-between font-extrabold">
            <p>글자 크기</p>
            <div>드롭박스</div>
          </div>
          <div className="text-grey-700 flex h-[60px] items-center justify-between font-extrabold">
            <p>음성 안내</p>
            <div>토글 버튼</div>
          </div>
          <div className="text-grey-700 flex h-[60px] items-center justify-between font-extrabold">
            <p>알림 설정</p>
            <div>토글 버튼</div>
          </div>
          <div className="text-grey-700 flex h-[60px] items-center justify-between font-extrabold">
            <p>디스플레이 모드</p>
            <div>드롭박스</div>
          </div>
        </section>
        <button className="bg-grey-500 mt-6 flex h-10 items-center justify-center gap-[7px] rounded-[5px] text-sm font-medium text-white">
          <div className="flex aspect-square h-[18px] items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p>로그아웃</p>
        </button>
        <div className="flex justify-center">
          <button className="text-grey-500 mt-[222px] text-xs font-medium hover:text-red">
            회원탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}
