"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/utils/dropdownMenu";
import {
  DeleteIcon,
  EditIcon,
  MeatballEditIcon,
  MeatballsIcon,
  ReportIcon,
  ShareIcon,
  TrashcanIcon,
} from "../utils/icons";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function MeatballMenu({ id }: { id: string }) {
  const { data: session } = useSession();
  const token = session?.user.token;

  const router = useRouter();

  const deleteFeedback = async (feedbackId: string, token: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/feedbacks/${feedbackId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        },
      );

      if (!res.ok) {
        const errorData = await res.json(); // 서버 응답 확인
        throw new Error(errorData.message || "피드백 삭제에 실패했습니다.");
      }

      console.log("✅ 피드백 삭제 성공:", feedbackId);
      return true;
    } catch (error) {
      console.error("❌ deleteFeedback Error:", error);
      throw error; // 에러를 호출한 곳에서 처리할 수 있도록 던지기
    }
  };

  const onDelete = async () => {
    if (!token) {
      toast.error("게시물 삭제 권한이 없습니다.");
      return;
    }
    Swal.fire({
      title: "정말 게시물을 삭제하시겠습니까?",
      text: "삭제시 다시 복구시킬 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFeedback(id, token);
        router.push("/feedback");
        Swal.fire({
          title: "삭제 완료!",
          text: "게시물이 성공적으로 삭제되었습니다.",
          icon: "success",
        });
        setTimeout(() => router.refresh(), 1500);
      }
    });
  };

  const onEdit = (feedbackId: string) => {
    router.push(`/feedback/${feedbackId}/edit`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MeatballsIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="flex cursor-pointer items-center"
          onClick={() => onEdit(id)}
        >
          <MeatballEditIcon />
          <p className="text-gray-500? text-xs">수정하기</p>
        </DropdownMenuItem>
        {token && (
          <DropdownMenuItem
            className="flex cursor-pointer items-center"
            onClick={onDelete}
          >
            <DeleteIcon />
            <p className="text-gray-500? text-xs">삭제하기</p>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem className="flex cursor-pointer items-center">
          <ReportIcon />
          <p className="text-gray-500? text-xs">신고하기</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex cursor-pointer items-center">
          <ShareIcon />
          <p className="text-gray-500? text-xs">공유하기</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
