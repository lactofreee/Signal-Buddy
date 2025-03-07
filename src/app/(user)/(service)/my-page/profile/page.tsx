import Image from "next/image";
import Link from "next/link";

import myPostit from "@/public/imgs/my-postit.svg";
import myFeedback from "@/public/imgs/my-feedback.svg";
import likedPostit from "@/public/imgs/liked-postit.svg";
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

const activities = [
  {
    href: "/my-page/my-postits",
    icon: myPostit,
    label: "내가 작성한 포스트잇",
  },
  {
    href: "/my-page/my-postits",
    icon: likedPostit,
    label: "내가 좋아한 포스트잇",
  },
  {
    href: "/my-page/my-postits",
    icon: myFeedback,
    label: "내가 작성한 피드백",
  },
  {
    href: "/my-page/my-postits",
    icon: likedFeedback,
    label: "내가 좋아한 피드백",
  },
];

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/");
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
        <section className="rounded-[8px] theme-content-bg px-2 pb-4 pt-3">
          <h2 className="theme-feedback-filter-category mb-2 text-xs font-semibold">
            최근 경로
          </h2>
          <ul className="flex flex-col gap-2">
            <li className="my-[10px]">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="flex aspect-square w-[40px] items-center justify-center rounded-full bg-teal">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#FFFFFF"
                      className="h-[24px] w-[24px]"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.161 2.58a1.875 1.875 0 0 1 1.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0 1 21.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 0 1-1.676 0l-4.994-2.497a.375.375 0 0 0-.336 0l-3.868 1.935A1.875 1.875 0 0 1 2.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437ZM9 6a.75.75 0 0 1 .75.75V15a.75.75 0 0 1-1.5 0V6.75A.75.75 0 0 1 9 6Zm6.75 3a.75.75 0 0 0-1.5 0v8.25a.75.75 0 0 0 1.5 0V9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="theme-my-profile-location-name font-bold">
                      최근 목적지 이름
                    </p>
                    <p className="theme-my-profile-location-address text-xs font-medium">
                      최근 목적지 주소
                    </p>
                  </div>
                </div>
                <div className="outline-gray-300 flex h-6 w-6 items-center justify-center rounded-full outline outline-1">
                  <StarIcon />
                </div>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
