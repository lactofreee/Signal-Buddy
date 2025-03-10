import { redirect } from "next/navigation";
import { toast } from "sonner";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/feedbacks`;

export const getLikes = async (id: string, token: string) => {
  try {
    const END_POINT = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/feedbacks/${id}`;
    console.log(END_POINT);
    try {
      const res = await fetch(END_POINT, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || "데이터를 가져오는 데 실패했습니다.",
        );
      }
      const resData = await res.json();
      console.log(resData.data.likeCount);
      return resData.data.likeCount;
    } catch (error) {
      console.error("❌ fetchData Error:", error);
      throw error;
    }
  } catch (error) {
    console.error("❌ fetchData Error:", error);
    throw error;
  }
};

export const getIsLiked = async (id: string, token: string) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}/like/exist`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("유효하지 않은 응답");
    }

    const resJson = await res.json();
    return resJson.data.status;
  } catch (error) {
    console.error("❌ fetchData Error:", error);
    toast.error("로그인이 만료되었습니다. 다시 로그인 후 사용해주세요.");
    redirect("/login");
  }
};

export const addLikes = async (id: string, token: string) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || "데이터를 가져오는 데 실패했습니다.",
      );
    }
    return await res.json();
  } catch (error) {
    console.error("❌ fetchData Error:", error);
    throw error;
  }
};

export const deleteLikes = async (id: string, token: string) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}/like`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || "데이터를 가져오는 데 실패했습니다.",
      );
    }
    return await res.json();
  } catch (error) {
    console.error("❌ fetchData Error:", error);
    throw error;
  }
};
