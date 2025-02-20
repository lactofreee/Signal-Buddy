import MeatballMenu from "@/src/components/feedback/MeatballMenu";
import { ArrowLeftIcon } from "@/src/components/utils/icons";
import Image from "next/image";
import Link from "next/link";
import user_img from "@/public/imgs/DefaultProfile.png";

export default function Page() {
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
              <div className="flex flex-col gap-1 text-xs font-medium">
                <p className="text-gray-700">username</p>
                <p className="text-gray-500">example@gmail.com</p>
              </div>
            </div>
            <div className="font-semibold text-gray-500">오작동</div>
          </div>
          {/* 본문 메인 */}
          <div className="mt-4">
            <h1 className="mb-2 text-lg font-bold text-gray-950">Title</h1>
            <span className="">2025.02.20</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Assumenda, reprehenderit illum voluptates aliquam vero minima
              laudantium a aliquid accusamus voluptatem optio sapiente quia
              dignissimos nobis quisquam earum accusantium fugiat. Quasi.
            </p>
          </div>
        </div>
      </div>
      {/* 댓글 입력창 */}
      {/* 댓글 목록 */}
    </div>
  );
}
