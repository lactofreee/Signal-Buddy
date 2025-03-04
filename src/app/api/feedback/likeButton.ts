// import { fetchDataFeedbackItem } from "./fetchFeedbackItem";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/feedbacks`;

// // export const getLikes = async (id: string) => {
// //   try {
// //     const res = await fetch(`${BASE_URL}/${id}/exist`, {
// //       method: "GET",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       cache: "no-store",
// //     });

// //     if (!res.ok) {
// //       const errorData = await res.json();
// //       throw new Error(
// //         errorData.message || "데이터를 가져오는 데 실패했습니다.",
// //       );
// //     }
// //     const resData = await res.json();
// //     return resData;
// //   } catch (error) {
// //     console.error("❌ fetchData Error:", error);
// //     throw error;
// //   }
// // };

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

export const gerIsLiked = async (id: string, token: string) => {
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
      const errorData = await res.json();
      throw new Error(
        errorData.message || "데이터를 가져오는 데 실패했습니다.",
      );
    }
    const resJson = await res.json();
    return resJson.data.status;
  } catch (error) {
    console.error("❌ fetchData Error:", error);
    throw error;
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
