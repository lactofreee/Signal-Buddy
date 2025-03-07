"use client";

import { CrossRoadSearchbar } from "@/src/components/feedback/ui/CrossRoadSearchbar";
import DropDownMenu from "@/src/components/feedback/ui/DropDownMenu";
import { ArrowLeftIcon, CheckIcon } from "@/src/components/utils/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import InputFile from "@/src/components/feedback/ui/InputFile";

export default function Page() {
  const { data: session } = useSession();
  const token = session?.user.token;

  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<string>("ETC");
  const [isSecret, setIsSecret] = useState(false);
  const [crossroadId, setCrossroadId] = useState<number>(2);
  const [imageUrl, setImageUrl] = useState<File | null | string>(null);

  const handleToggleChange = (value: string) => {
    setSelectedOption((prev) => (prev === value ? null : value));
    setIsSecret((prev) => !prev);
  };

  const postNewFeedback = async (formData: FormData) => {
    if (!token) {
      toast.error("올바르지 않은 접근입니다. 로그인을 다시 시도해주세요.");
      router.push("/login");
      return;
    }

    try {
      console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/feedbacks`);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/feedbacks`,
        {
          method: "POST",
          headers: {
            Authorization: token,
          },
          body: formData,
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "피드백 제출에 실패했습니다.");
      }

      const data = await res.json();
      router.push("/feedback");
      toast.success("피드백이 성공적으로 제출되었습니다.");
      return data;
    } catch (error) {
      console.error("❌ postNewFeedback Error:", error);
      router.push("/feedback");
      toast.error(
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.",
      );
    }
  };

  const submitHandle = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    const requestData = {
      subject: title,
      content,
      category: category.toUpperCase(),
      secret: isSecret,
      crossroadId,
      createdAt: new Date().toISOString(),
    };

    const imageFile = {
      imageUrl,
    };

    console.log(requestData);
    console.log(imageFile);

    if (!title || !content || !category) {
      console.log(formData);
      toast.error("내용을 모두 입력해주세요.");
      return;
    }

    if (imageUrl) {
      formData.append("imageFile", imageUrl);
    }

    formData.append(
      "request",
      new Blob([JSON.stringify(requestData)], { type: "application/json" }),
    );

    Swal.fire({
      title: "피드백 제출",
      text: "작성한 내용을 제출하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "#8DB4AF",
      cancelButtonColor: "#64748B",
      confirmButtonText: "제출",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        postNewFeedback(formData);
      }
    });
  };

  return (
    <div className="flex flex-col md:mx-auto md:w-[821px]">
      {/* 헤더 영역 */}
      <Link
        href={`/feedback`}
        className="flex h-10 items-center gap-1 border-b theme-line"
      >
        <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
        <p className="text-sm font-semibold theme-header-text">뒤로가기</p>
      </Link>
      <form
        className="flex flex-col gap-4 pt-2"
        onSubmit={(e) => submitHandle(e)}
      >
        {/* 제목 입력 */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="title" className="text-sm font-medium theme-label">
            제목
          </Label>
          <Input
            type="text"
            className="h-12 rounded-[4px] p-4 border theme-line theme-content-bg shadow-none text-gray-500 font-medium placeholder:text-gray-400"
            placeholder="제목을 입력해주세요."
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        {/* 피드백 유형 선택 */}
        <div className="flex flex-col gap-2">
          <p className="text-sm theme-label font-medium">피드백 유형</p>
          <DropDownMenu addCategory={setCategory} />
        </div>
        {/* 본문 입력 */}
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium theme-label">본문</p>
          <textarea
            className="h-[409px] resize-none rounded-[4px] p-4 border theme-line theme-content-bg placeholder:text-sm placeholder:text-gray-400 text-gray-500 text-[14px]"
            placeholder="내용을 입력해주세요."
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        </div>
        {/* 피드백 위치 */}
        <div className="flex flex-col gap-2">
          <CrossRoadSearchbar
            addCrossRoad={setCrossroadId}
            crossroadId={crossroadId}
          />
        </div>
        {/* 이미지 입력 */}
        <div className="flex flex-col gap-2">
          <InputFile setImageUrl={setImageUrl} />
        </div>

        {/* 숨김처리 여부 - 토글 버튼
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium theme-label">숨김처리</p>

          <div
            className={`mb-[187px] flex cursor-pointer items-center gap-1 transition-all`}
            onClick={() => handleToggleChange("isHidden")}
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded-sm border-2 transition-all ${
                selectedOption === "isHidden" ? "bg-gray-500" : "bg-white"
              }`}
            >
              {selectedOption === "isHidden" && (
                <CheckIcon className="text-white" />
              )}
            </div>
            <span className="text-xs font-medium theme-label-dark">
              관리자만 보기
            </span>
          </div>
        </div> */}

        {/* 제출 버튼 */}
        <div className="flex justify-end mt-[100px]">
          <button className="mb-[72px] h-10 w-[100px] rounded-[8px] bg-teal text-sm font-semibold text-white">
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
