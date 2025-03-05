"use client"

import { Button } from "@/components/ui/button";
import LogoutButton from "@/src/components/auth/logout/LogoutButton";
import { ArrowLeftIcon } from "@/src/components/utils/icons";
import { clickPushHandler } from "@/src/firebase/firebase";
import { signOutWithForm } from "@/src/services/auth.server.service";
import { signOut } from "next-auth/react";
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
            <p>푸시 알림 설정</p>
            <button onClick={clickPushHandler}>토글 버튼</button>
          </div>
          <div className="text-grey-700 flex h-[60px] items-center justify-between font-extrabold">
            <p>디스플레이 모드</p>
            <div>드롭박스</div>
          </div>
        </section>
        <LogoutButton />
        <div className="flex justify-center">
          <button className="text-grey-500 mt-[222px] text-xs font-medium hover:text-red">
            회원탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}
