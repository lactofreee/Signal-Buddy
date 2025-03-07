import client from "../lib/api/client";

export const verifyPW = async (memberId: number, password: string) => {
  return await client.post(
    `/api/members/${memberId}/verify-password`,
    {
      password,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );
};
export const changeProfileImg = async (
  memberId: number,
  formData: FormData,
) => {
  return await client.post(
    `/api/members/${memberId}/profile-image`, //
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};

export const changeUserInfo = async (
  memberId: number,
  body: {
    password?: string;
    nickname: string;
  },
) => {
  return await client.patch(
    `/api/members/${memberId}`, //
    body,
  );
};

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
