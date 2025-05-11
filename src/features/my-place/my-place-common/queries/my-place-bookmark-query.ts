import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Bookmark } from "@/src/types/my-place";
import client from "@/src/lib/api/client";

type MyPlacesResponse = {
  searchResults: Bookmark[];
  totalPages: number;
};

export const myPlaceBookmarkQuery = (
  memberId: number | undefined,
  page: number,
  size = 15,
) =>
  useQuery<MyPlacesResponse>({
    queryKey: ["myPlaces", memberId, page],
    queryFn: async () => {
      if (!memberId) return { searchResults: [], totalPages: 1 };

      const response = await client.get(`/api/members/${memberId}/bookmarks`, {
        params: { page, size },
      });

      if (response.data.status === "성공") {
        return {
          searchResults: response.data.data.searchResults,
          totalPages: response.data.data.totalPages,
        };
      }
      throw new Error("북마크 불러오기 실패");
    },
    placeholderData: keepPreviousData,
    enabled: !!memberId,
  });
