"use client";

import React from "react";
import Image from "next/image";
import logo from "@/public/imgs/Logo Symbol.png";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Profile from "../profile/Profile";

export default function Navbar() {
  const { data: session } = useSession();
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
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
      </div>
    </nav>
  );
}
