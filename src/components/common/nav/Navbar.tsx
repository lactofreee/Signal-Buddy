"use client";

import React, { useState } from "react";
import Image from "next/image";
import logo from "@/public/imgs/Logo Symbol.png";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Profile from "../profile/Profile";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);

  const handleClickMenuBtn = () => {
    setOpen((prev) => !prev);
  };

  return (
    <nav className="w-full flex justify-center" aria-label="Main Navigation">
      <div className="flex w-full items-center justify-between">
        {/* 로고 영역 */}
        <div>
          <Link href="/" aria-label="Homepage">
            <Image src={logo} alt="Signal Buddy 로고" width={85} height={31} />
          </Link>
        </div>

        {/* 햄버거 메뉴 */}
        <div className="sm:hidden">
          <Button onClick={handleClickMenuBtn} size="icon" variant={"ghost"}>
            {open ? (
              <XMarkIcon className="!w-6 !h-6" />
            ) : (
              <Bars3Icon className="!w-6 !h-6" />
            )}
          </Button>
        </div>

        {/* 내비게이션 메뉴 */}
        <div className="text-grey-700 hidden items-center gap-5 font-semibold sm:flex">
          <Link href="/map" className="hover:underline">
            지도
          </Link>
          <Link href="/feedback" className="hover:underline">
            피드백
          </Link>
          {session ? (
            <>
              <Link href="/my-place">즐겨찾기</Link>
              <Link href="/my-page/profile">
                <Profile src={session.user.profileImageUrl} />
              </Link>
            </>
          ) : (
            <Link href="/login" className="hover:underline">
              로그인
            </Link>
          )}
        </div>

        {/* 모바일 내비게이션 메뉴 */}
        <div
          className={cn(
            "fixed bg-gray-100 w-screen top-0 right-0 bottom-0 -z-10 pt-[70px] pb-5 px-4 transition-all flex flex-col items-center gap-2",
            open ? "left-0" : "left-full",
          )}
          onClick={handleClickMenuBtn}
        >
          <Link
            href={session ? "/my-page/profile" : "/login"}
            className="bg-white w-full py-3 px-4 rounded-md flex gap-4 items-center"
          >
            <Profile
              src={session ? session.user.profileImageUrl : undefined}
              size="xl"
            />
            <div className="flex flex-col font-bold text-gray-700 flex-1">
              {session ? (
                <>
                  <div>{session.user.nickname}</div>
                  <div className="text-xs text-gray-500 font-medium">
                    {session.user.email}
                  </div>
                </>
              ) : (
                "로그인이 필요합니다."
              )}
            </div>
            <ChevronRight className="text-gray-500" />
          </Link>

          <div className="w-full h-10 border-b border-gray-300 flex items-center text-sm font-extrabold text-gray-500">
            메뉴
          </div>
          <div className="w-full font-bold flex flex-col gap-2 flex-grow">
            <Link href="/map" className="leading-[50px]">
              지도
            </Link>
            {session && (
              <Link href="/my-place" className="leading-[50px]">
                즐겨찾기
              </Link>
            )}
            <Link href="/feedback" className="leading-[50px]">
              피드백
            </Link>
          </div>
          <Image
            src={"/imgs/sm-logo.svg"}
            alt="small logo"
            width={109}
            height={19}
          />
        </div>
      </div>
    </nav>
  );
}
