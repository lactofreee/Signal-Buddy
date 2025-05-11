"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { bookmarkRecentPath } from "@/src/features/my-page/my-page-recent-path/actions/bookmark-recent-path";
import BookmarkToggleButton from "@/src/features/my-page/my-page-recent-path/components//my-page-bookmark-toggle-button";
import RecentPathCard from "@/src/features/my-page/my-page-recent-path/components/my-page-recent-path-card";

export interface DestinationItem {
  id?: string;
  name: string;
  address?: string;
  bookmarked: boolean;
  lat?: number;
  lng?: number;
  bookmarkId?: number;
  recentPathId: number;
}

export default function RecentPathItem({
  recentPathId,
  name,
  address,
  bookmarked,
  lat,
  lng,
}: DestinationItem) {
  const { data: session } = useSession();
  const router = useRouter();

  const { add, remove } = bookmarkRecentPath();

  const handleClickBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!session?.user?.memberId) return;

    if (bookmarked) {
      remove.mutate(recentPathId);
    } else {
      add.mutate(recentPathId);
    }
  };

  const handleNavigate = () => {
    const encodedName = encodeURIComponent(name);
    router.push(`/map/direction?end=${lng},${lat},${encodedName}`);
  };

  return (
    <li className="hover:theme-hover-recent-path mx-1 rounded-md">
      <div
        className="flex items-center justify-between my-[10px] px-1 cursor-pointer"
        onClick={handleNavigate}
      >
        <RecentPathCard
          name={name}
          address={address}
          onClick={handleNavigate}
        />
        <BookmarkToggleButton
          isBookmarked={bookmarked}
          onClick={handleClickBookmark}
        />
      </div>
    </li>
  );
}
