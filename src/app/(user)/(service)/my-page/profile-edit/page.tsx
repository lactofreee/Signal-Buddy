import { auth } from "@/src/auth";
import UserEdit from "@/src/components/my-page/UserEdit";
import { ArrowLeftIcon } from "@/src/components/utils/icons";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();
  if (!session) redirect("/");
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-[400px] flex-col gap-5 pt-2 sm:px-4">
        <section className="flex flex-col gap-2">
          <div className="theme-line flex h-10 items-center gap-2 border-b">
            <Link href="/my-page/profile">
              <ArrowLeftIcon />
            </Link>
            <h1 className="theme-category-title text-sm font-extrabold">
              프로필 수정
            </h1>
          </div>
        </section>
        <UserEdit user={session.user} />
      </div>
    </div>
  );
}
