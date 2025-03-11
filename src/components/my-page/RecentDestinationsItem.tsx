"use client";

import { useSession } from "next-auth/react";
import { StarIcon } from "../utils/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import client from "@/src/lib/api/client";
import { Destination } from "./RecentDestinations";
import { IFeedbackListItem } from "@/src/types/feedback/feedbackList";
import { useRouter } from "next/navigation";

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

export default function RecentDestinationsItem({
  recentPathId,
  name,
  address,
  bookmarked,
  lat,
  lng,
}: DestinationItem) {
  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();

  const addBookmarkMutation = useMutation({
    mutationFn: async (recentPathId: number) => {
      if (!session?.user?.memberId) return;
      await client.post(`/api/recent-path/${recentPathId}/bookmarks`, {
        memberId: parseInt(`${session.user.memberId}`),
      });
    },
    onMutate: async (recentPathId) => {
      await queryClient.cancelQueries({
        queryKey: ["recentPaths", session?.user?.memberId],
      });

      const previousPaths = queryClient.getQueryData<Destination[]>([
        "recentPaths",
      ]);

      if (previousPaths) {
        const newData = previousPaths.map((item) =>
          item.recentPathId === recentPathId
            ? { ...item, bookmarked: true }
            : item,
        );
        queryClient.setQueryData<Destination[]>(
          ["recentPaths", session?.user?.memberId],
          newData,
        );
      }

      return { previousPaths };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recentPaths", session?.user?.memberId],
      });
    },
    onError: (error, recentPathId, context) => {
      if (context?.previousPaths) {
        queryClient.setQueryData(
          ["recentPaths", session?.user?.memberId],
          context.previousPaths,
        );
      }
      alert("북마크 추가에 실패했습니다.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["recentPaths", session?.user?.memberId],
      });
    },
  });

  const deleteBookmarkMutation = useMutation({
    mutationFn: async (recentPathId: number) => {
      if (!session?.user?.memberId) return;

      await client.delete(`/api/recent-path/${recentPathId}/bookmarks`);
    },

    onMutate: async (recentPathId) => {
      await queryClient.cancelQueries({
        queryKey: ["recentPaths", session?.user?.memberId],
      });

      const previousPaths = queryClient.getQueryData<Destination[]>([
        "recentPaths",
      ]);

      if (previousPaths) {
        const newData = previousPaths.map((item) =>
          item.recentPathId === recentPathId
            ? { ...item, bookmarked: true }
            : item,
        );
        queryClient.setQueryData<Destination[]>(
          ["recentPaths", session?.user?.memberId],
          newData,
        );
      }

      return { previousPaths };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recentPaths", session?.user?.memberId],
      });
    },
    onError: (error, recentPathId, context) => {
      if (context?.previousPaths) {
        queryClient.setQueryData(
          ["recentPaths", session?.user?.memberId],
          context.previousPaths,
        );
      }
      alert("북마크 추가에 실패했습니다.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["recentPaths", session?.user?.memberId],
      });
    },
  });

  const handleClickBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!session?.user?.memberId) return;

    if (bookmarked) {
      deleteBookmarkMutation.mutate(recentPathId);
    } else {
      addBookmarkMutation.mutate(recentPathId);
    }
  };

  const handleNavigate = () => {
    const encodedName = encodeURIComponent(name);
    router.push(`/map/direction?end=${lng},${lat},${encodedName}`);
  };

  return (
    <li className="hover:theme-hover-recent-path mx-1 rounded-md">
      <div
        className="flex items-center justify-between my-[10px] px-1"
        onClick={handleNavigate}
      >
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
            <p className="theme-my-profile-location-name font-bold">{name}</p>
            <p className="theme-my-profile-location-address text-xs font-medium">
              {address}
            </p>
          </div>
        </div>
        <div
          onClick={handleClickBookmark}
          className={`hover:cursor-pointer flex h-6 w-6 items-center justify-center rounded-full outline outline-1 hover:theme-hover-recent-path-star-icon ${
            bookmarked
              ? "theme-bookmarked-recent-path-star-icon"
              : "outline-gray-300 text-gray-300"
          }`}
        >
          <span className="hover:theme-hover-recent-path-star-icon">
            <StarIcon />
          </span>
        </div>
      </div>
    </li>
  );
}
