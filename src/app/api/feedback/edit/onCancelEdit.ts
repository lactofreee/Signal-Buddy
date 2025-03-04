import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Swal from "sweetalert2";

export const onCancel = (router: AppRouterInstance, feedbackId: number) => {
  Swal.fire({
    title: "게시물 수정을 취소하시겠습니까?",
    text: "작성 중인 변경사항은 저장되지 않습니다.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "확인",
    cancelButtonText: "취소",
  }).then((result) => {
    if (result.isConfirmed) {
      router.push(`/feedback/${feedbackId}`);
    }
  });
};
