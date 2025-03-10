import Image from "next/image";
import Link from "next/link";

import myFeedback from "@/public/imgs/my-feedback.svg";
import likedFeedback from "@/public/imgs/liked-feedback.svg";
import {
  ArrowRightIcon,
  StarIcon,
  SettingIcon,
  UserIcon,
} from "@/src/components/utils/icons";
import { auth } from "@/src/auth";
import { redirect } from "next/navigation";
import Profile from "@/src/components/common/profile/Profile";
import RecentDestinations from "@/src/components/my-page/RecentDestinations";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/");
  const nickname = session.user.nickname;

  const activities = [
    {
      href: `/feedback?target=writer&keyword=${encodeURIComponent(nickname)}`,
      icon: myFeedback,
      label: "내가 작성한 피드백",
    },
    {
      href: "/my-page/liked",
      icon: likedFeedback,
      label: "내가 좋아한 피드백",
    },
  ];

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-[400px] flex-col gap-5 pt-2">
        <section className="flex flex-col gap-2">
          <div className="theme-line flex h-10 items-center justify-between border-b">
            <h1 className="theme-my-page-title text-sm font-extrabold">
              나의 프로필
            </h1>
            <Link href="/my-page/settings">
              <span className="theme-my-page-setting-icon">
                <SettingIcon />
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4 rounded-[8px] theme-content-bg px-2 py-3">
            <Profile
              src={session ? session.user.profileImageUrl : undefined}
              size="xl"
            />
            <div className="flex flex-col">
              <p className="theme-my-profile-name font-bold">
                {session.user.nickname}
              </p>
              <p className="theme-my-profile-email text-xs font-medium">
                {session.user.email}
              </p>
            </div>
          </div>
          <Link
            href="/my-page/profile-edit"
            className="flex h-10 items-center justify-center rounded-[8px] bg-teal text-sm font-bold text-white"
          >
            프로필 수정
          </Link>
        </section>
        <section className="rounded-[8px] theme-content-bg px-2 pb-4 pt-3">
          <h2 className="theme-feedback-filter-category mb-2 text-xs font-semibold">
            내 활동
          </h2>
          <ul className="flex flex-col gap-2">
            {activities.map(({ href, icon, label }, index) => (
              <li key={index}>
                <Link
                  href={href}
                  className="flex h-10 items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={icon}
                      width={30}
                      height={30}
                      alt={label}
                      loading="lazy"
                    ></Image>
                    <h3 className="theme-my-profile-name font-medium">
                      {label}
                    </h3>
                  </div>
                  <span className="theme-my-page-arrow-right-icon">
                    <ArrowRightIcon />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <RecentDestinations />
      </div>
    </div>
  );
}
