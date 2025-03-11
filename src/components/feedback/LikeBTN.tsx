"use client";

import { fetchDataFeedbackItem } from "@/src/app/api/feedback/fetchFeedbackItem";
import { getIsLiked } from "@/src/app/api/feedback/likeButton";
import HeartIcon from "@heroicons/react/24/solid/HeartIcon";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

export default function LikeBTN({
  feedbackId,
  session,
}: {
  feedbackId: string;
  session?: Session | null;
}) {
  const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/feedbacks/${feedbackId}/like`;

  const router = useRouter();

  const token = session?.user.token;
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    
    const initializeLikeBTN = async () => {

      try {
        const feedbackRes = await fetchDataFeedbackItem(feedbackId);
        setLikeCount(feedbackRes.data.likeCount);
        if (!token) return;
        const isLikedStatus = await getIsLiked(feedbackId, token);
        if (isLikedStatus === true) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }

        console.log(`isLiked: ${isLiked} likeCount: ${likeCount}`);
      } catch (error) {
        console.error(error);
        toast.error("좋아요를 불러오는데 실패했습니다. 다시 시도해주세요.");
      }
    };
    initializeLikeBTN();
  }, []);

  const fetchAddLike = async () => {
    if (!token) return;
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

  const fetchDeleteLike = async () => {
    if (!token) return;
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

  const addLike = async () => {
    setLikeCount((prev) => prev + 1);
    setIsLiked((prev) => !prev);
    await fetchAddLike();
  };

  const deleteLike = async () => {
    setLikeCount((prev) => prev - 1);
    setIsLiked((prev) => !prev);
    await fetchDeleteLike();
  };

  const onLikeHandle = () => {
    if (!token) {
      Swal.fire({
        title: "로그인 후 사용해주세요.",
        text: "로그인 창으로 이동하시겠습니까?",
        showCancelButton: true,
        confirmButtonColor: "#8DB4AF",
        cancelButtonColor: "#64748B",
        confirmButtonText: "로그인 하러 가기",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          router.replace("/login");
        }
      });
      return;
    }
    if (isLiked) {
      deleteLike();
    } else {
      addLike();
    }
  };

  return (
    <div className="mb-1 flex justify-center">
      <button
        onClick={onLikeHandle}
        className={`flex items-center gap-1 justify-center w-[68px] h-[30px] border border-gray-400 rounded-full`}
      >
        {isLiked ? (
          <HeartIcon className="fill-red w-4" />
        ) : (
          <HeartIcon className="stroke-gray-400 fill-none w-4" />
        )}
        <p className="text-sm font-medium text-gray-400">{likeCount}</p>
      </button>
    </div>
  );
}
