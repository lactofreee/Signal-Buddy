"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/utils/dropdown-menu";
import { deleteFeedback } from "../actions/feedback-meatball-menu";

import {
  DeleteIcon,
  MeatballEditIcon,
  MeatballsIcon,
  ShareIcon,
} from "@/src/components/utils/icons";

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
        deleteFeedback(feedbackId, token, router);
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
