import {
  ArrowLeftIcon,
  CameraIcon,
  UserIcon,
} from "@/src/components/utils/icons";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-[400px] flex-col gap-5 pt-2 sm:px-4">
        <section className="flex flex-col gap-2">
          <div className="border-grey-300 flex h-10 items-center gap-2 border-b">
            <Link href="/my-page/profile">
              <ArrowLeftIcon />
            </Link>
            <h1 className="text-grey-700 text-sm font-extrabold">
              프로필 수정
            </h1>
          </div>
        </section>
        <section className="flex justify-center">
          <div className="relative aspect-square w-[100px]">
            <div className="outline-grey-300 flex aspect-square w-[100px] items-center justify-center rounded-full bg-white outline outline-1">
              <UserIcon className="h-[58px] w-[58px]" />
            </div>
            <label className="hover:bg-grey-300 outline-grey-300 absolute bottom-0 right-0 flex aspect-square w-[26px] cursor-pointer items-center justify-center rounded-full bg-white outline outline-1">
              <CameraIcon className="aspect-square w-[18px]" />
              <input type="file" className="hidden" />
            </label>
          </div>
        </section>
        <section>
          <form action="" className="flex flex-col gap-2">
            <div className="mb-2 flex flex-col gap-2">
              <p className="text-grey-500 text-xs font-medium">닉네임</p>
              <input
                type="text"
                className="outline-grey-300 h-12 w-full rounded-sm px-4 text-sm outline outline-1"
                placeholder="닉네임을 입력해주세요."
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-grey-500 text-xs font-medium">새 비밀번호</p>
              <input
                type="text"
                className="outline-grey-300 h-12 w-full rounded-sm px-4 text-sm outline outline-1"
                placeholder="새 비밀번호를 입력해주세요."
              />
            </div>
            <button className="mt-10 h-10 rounded-[6px] bg-teal text-sm font-medium text-white">
              저장
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
