"use client";

import { ArrowLeftIcon } from "@/src/components/utils/icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LogoutButton from "@/src/features/auth/auth-common/components/logout-btn";
import { DropdownThemeToggle } from "@/src/features/my-page/my-page-setting/components/my-page-display-mode-toggle";
import {
  handleDeleteUser,
  useDeleteUser,
} from "@/src/features/my-page/my-page-setting/actions/delete-user";

export default function Page() {
  const session = useSession();
  const userId = session.data?.user.memberId;

  const deleteUserMutation = useDeleteUser();

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
            onClick={() =>
              handleDeleteUser(userId, (id) => deleteUserMutation.mutate(id))
            }
            className="theme-my-page-withdraw mt-[222px] text-xs font-medium hover:text-red"
          >
            회원 탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}
