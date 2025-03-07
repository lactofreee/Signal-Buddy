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

export default function MeatballMenu({
  feedbackId,
  authorId,
}: {
  feedbackId: string;
  authorId: number;
}) {
  const { data: session } = useSession();
  const token = session?.user.token;
  const userId = session?.user.memberId;

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

      router.push("/feedback");
      toast.success("게시물이 삭제되었습니다.");

      return true;
    } catch (error) {
      router.push(`/feedback/${feedbackId}`);
      toast.error("게시물 삭제에 실패했습니다.");
      console.error("❌ deleteFeedback Error:", error);
      throw error;
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
      focusConfirm: false, 
      showCancelButton: true,
      confirmButtonColor: "#FF6156",
      cancelButtonColor: "#64748B",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFeedback(feedbackId, token);
        // setTimeout(() => router.push("/feedback"), 1000);
        // Swal.fire({
        //   title: "삭제 완료!",
        //   text: "게시물이 성공적으로 삭제되었습니다.",
        //   icon: "success",
        // });
        // router.refresh();
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
        {userId === authorId && (
          <DropdownMenuItem
            className="flex cursor-pointer items-center"
            onClick={() => onEdit(feedbackId)}
          >
            <MeatballEditIcon />
            <p className="text-gray-500? text-xs">수정하기</p>
          </DropdownMenuItem>
        )}

        {token && userId === authorId && (
          <DropdownMenuItem
            className="flex cursor-pointer items-center"
            onClick={onDelete}
          >
            <DeleteIcon />
            <p className="text-gray-500? text-xs">삭제하기</p>
          </DropdownMenuItem>
        )}

        {/* <DropdownMenuItem className="flex cursor-pointer items-center">
          <ReportIcon />
          <p className="text-gray-500? text-xs">신고하기</p>
        </DropdownMenuItem> */}

        <DropdownMenuItem className="flex cursor-pointer items-center">
          <ShareIcon />
          <p className="text-gray-500? text-xs">공유하기</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
