import { toast } from "sonner";

export const fetchAddLike = async (
  token: string,
  feedbackId: string,
  router: ReturnType<typeof import("next/navigation").useRouter>,
) => {
  const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/feedbacks/${feedbackId}/like`;
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      cache: "no-cache",
    });

    if (res.status === 401) {
      toast.error("로그인이 만료되었습니다. 다시 로그인해주세요.");
      router.replace("/login");
      return;
    }

    if (!res.ok) {
      throw new Error(`응답 오류: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("❌ fetchAddLike Error:", error);
  }
};

export const fetchDeleteLike = async (
  token: string,
  feedbackId: string,
  router: ReturnType<typeof import("next/navigation").useRouter>,
) => {
  const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/feedbacks/${feedbackId}/like`;
  try {
    const res = await fetch(BASE_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      cache: "no-cache",
    });

    if (res.status === 401) {
      toast.error("로그인이 만료되었습니다. 다시 로그인해주세요.");
      router.replace("/login");
      return;
    }

    if (!res.ok) {
      throw new Error(`응답 오류: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("❌ fetchDeleteLike Error:", error);
  }
};
