import { useMutation } from "@tanstack/react-query";
import client from "@/src/lib/api/client";
import { signOut } from "next-auth/react";
import Swal from "sweetalert2";

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: async (userId: number) => {
      await client.delete(`/api/members/${userId}`);
    },
    onSuccess: () => {
      signOut({ redirectTo: "/login" });
    },
    onError: (error) => {
      console.error(error);
      alert("탈퇴에 실패했습니다. 다시 시도해주세요.");
    },
  });
};

export const handleDeleteUser = (
  userId: number | undefined,
  deleteUser: (userId: number) => void,
) => {
  if (!userId) return;

  Swal.fire({
    title: "정말 탈퇴하시겠습니까?",
    text: "더 이상 즐겨찾기와 피드백 작성을 이용할 수 없게 됩니다.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#FF6156",
    cancelButtonColor: "#64748B",
    confirmButtonText: "탈퇴",
    cancelButtonText: "취소",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteUser(userId);
    }
  });
};
