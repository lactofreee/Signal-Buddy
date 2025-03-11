"use client";

import LogoutButton from "@/src/components/auth/logout/LogoutButton";
import { Switch } from "@/src/components/shadcn/components/ui/switch";
import { DropdownThemeToggle } from "@/src/components/display-mode/DarkModeToggle";
import { ArrowLeftIcon } from "@/src/components/utils/icons";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import client from "@/src/lib/api/client";
import Swal from "sweetalert2";

export default function Page() {
  const session = useSession();
  const userId = session.data?.user.memberId;

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: number) => {
      if (!session?.data?.user?.memberId) return;
      await client.delete(`/api/members/${session.data?.user.memberId}`);
    },
    onSuccess: () => {
      signOut({ redirectTo: "/login" });
    },
    onError: (error) => {
      console.error(error);
      alert("탈퇴에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const handleDeleteUser = () => {
    Swal.fire({
      title: "정말 탈퇴하시겠습니까?",
      text: "더 이상 즐겨찾기와 피드백 작성을 이용할 수 없게 됩니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF6156",
      cancelButtonColor: "#64748B",
      confirmButtonText: "탈퇴",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        if (!userId) return;
        deleteUserMutation.mutate(userId);
      }
    });
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
          {/* <div className="theme-category-title flex h-[60px] items-center justify-between font-extrabold">
            <p>푸시 알림 설정</p>
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
            </div>
          </div> */}
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
