"use client";

import client from "@/src/lib/api/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Destination } from "@/src/features/my-page/my-page-recent-path/index";

export default function recentPathsQuery() {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (status === "authenticated") {
      queryClient.invalidateQueries({
        queryKey: ["recentPaths", session?.user?.memberId],
      });
    }
  }, [session?.user?.token]);

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
            Authorization: `Bearer ${session.user.token}`,
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

  return {
    destinations,
    isLoading,
    isError,
    error,
  };
}
