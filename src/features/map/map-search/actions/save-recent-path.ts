import client from "@/src/lib/api/client";

export const saveRecentPath = async (
  memberId: number,
  body: {
    name: string;
    address: string;
    lat: number;
    lng: number;
  },
) => {
  return await client.post(`/api/members/${memberId}/recent-path`, body);
};
