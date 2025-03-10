"use client";

import { Button } from "@/components/ui/button";

import LogoutButton from "@/src/components/auth/logout/LogoutButton";
import { Switch } from "@/src/components/shadcn/components/ui/switch";
import { DropdownThemeToggle } from "@/src/components/display-mode/DarkModeToggle";
import { ArrowLeftIcon } from "@/src/components/utils/icons";
import { clickPushHandler } from "@/src/firebase/firebase";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import client from "@/src/lib/api/client";

export default function Page() {
  const session = useSession();
  const userToken = session.data?.user.token;

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: number) => {
      if (!session?.data?.user?.memberId) return;
      await client.delete(`/api/members/${session.data?.user.memberId}`);
    },
    onSuccess: () => {
      alert("탈퇴가 완료되었습니다.");
      signOut({ redirectTo: "/login" });
    },
    onError: (error) => {
      console.error(error);
      alert("탈퇴에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const handleDeleteUser = () => {
    const confirmed = window.confirm("탈퇴하시겠습니까?");
    if (!confirmed) return;

    deleteUserMutation.mutate(session.data?.user?.memberId!);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-[400px] flex-col gap-5 pt-2 sm:px-4">
        <section className="flex flex-col gap-2">
          <div className="theme-line flex h-10 items-center gap-2 border-b">
            <Link href="/my-page/profile">
              <span className="theme-my-page-arrow-left-icon">
                <ArrowLeftIcon />
              </span>
            </Link>
            <h1 className="theme-my-profile text-sm font-extrabold">설정</h1>
          </div>
        </section>
        <section>
          <div className="theme-category-title flex h-[60px] items-center justify-between font-extrabold">
            <p>음성 안내</p>
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" className="" />
            </div>
          </div>
          <div className="theme-category-title flex h-[60px] items-center justify-between font-extrabold">
            <p>푸시 알림 설정</p>
            <div className="flex items-center space-x-2">
              <Switch
                id="airplane-mode"
                // onClick={() => clickPushHandler(userToken!)}
              />
            </div>
          </div>
          <div className="theme-category-title flex h-[60px] items-center justify-between font-extrabold">
            <p>디스플레이 모드</p>
            <DropdownThemeToggle />
          </div>
        </section>
        <LogoutButton />
        <div className="flex justify-center">
          <button
            onClick={handleDeleteUser}
            className="theme-my-page-withdraw mt-[222px] text-xs font-medium hover:text-red"
          >
            회원 탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}
