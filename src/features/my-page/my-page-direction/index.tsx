"use client";

import client from "@/src/lib/api/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
// import RecentDestinationsItem from "@/src/features/my-page/my-page-direction/components/my-page-direction-item";

export interface Destination {
  recentPathId: number;
  name: string;
  address: string;
  lng: number;
  lat: number;
  lastAccessedAt: string;
  bookmarked: boolean;
}

export default function RecentDestinations() {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log(session);
    if (status === "authenticated") {
      queryClient.invalidateQueries({
        queryKey: ["recentPaths", session?.user?.memberId],
      });
    }
  }, [queryClient, session, session?.user.token, status]);

  const {
    data: destinations = [],
    isLoading,
    isError,
    error,
  } = useQuery<Destination[]>({
    queryKey: ["recentPaths", session?.user?.memberId],
    queryFn: async () => {
      if (!session?.user?.memberId) return [];
      const response = await client.get(
        `/api/members/${session.user.memberId}/recent-path`,
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`, // 최신 토큰 반영
          },
        },
      );
      const apiData = response.data;
      if (apiData.status === "성공") {
        return apiData.data as Destination[];
      }
      throw new Error("최근 경로 불러오기 실패");
    },
    enabled: !!session?.user?.memberId && status === "authenticated",
  });

  if (isLoading) return <div>로딩 중...</div>;

  if (isError && error instanceof Error)
    return <div>에러가 발생했습니다: {error.message}</div>;

  return (
    <section className="rounded-[8px] theme-content-bg pb-4 pt-3">
      <h2 className="theme-feedback-filter-category mb-2 text-xs font-semibold px-2">
        최근 경로
      </h2>
      <ul className="flex flex-col gap-2">
        {destinations.length > 0 ? (
          destinations.map((item) => (
            // <RecentDestinationsItem
            //   key={item.recentPathId}
            //   recentPathId={item.recentPathId}
            //   name={item.name}
            //   bookmarked={item.bookmarked}
            //   lat={item.lat}
            //   lng={item.lng}
            //   address={item.address}
            // />
            <div key={item.recentPathId}>수정</div> // 임시 데이터
          ))
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-center text-gray-500">
              최근 경로가 존재하지 않습니다.
            </p>
          </div>
        )}
      </ul>
    </section>
  );
}
