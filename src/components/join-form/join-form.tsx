// JoinForm.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import logo from "@/public/imgs/Logo.png";
import defaultProfile from "@/public/imgs/DefaultProfile.png";
import cameraIcon from "@/public/imgs/Camera.png";

export function JoinForm() {
  return (
    <form className="w-[360px] md:bg-white">
      <div className="flex flex-col ">
        <Image
          src={logo}
          alt="Signal Buddy 로고"
          width={206}
          height={38}
        />
        <p className="text-sm mt-4 text-gray-500">
          시그널 버디에 오신 것을 환영합니다.
        </p>
      </div>
      <div className="flex flex-col items-center mt-[32px]">
        <p className="self-start text-xs mt-4 font-medium text-gray-500">
          프로필 이미지
        </p>
        <div className="relative w-[100px] h-[100px] rounded-full bg-white border border-gray-300 flex items-center justify-center mt-2">
          <Image
            src={defaultProfile}
            alt="프로필 이미지"
            width={58}
            height={58}
            className="object-cover"
          />
          <div className="absolute bottom-[6px] right-[10px] w-[26px] h-[26px] bg-white border border-gray-400 rounded-full flex items-center justify-center transform translate-x-1/4 translate-y-1/4">
            <label htmlFor="profileImage">
              <Image src={cameraIcon} alt="이미지 추가" width={16} height={14} />
            </label>
          </div>
        </div>
      </div>
      <div className="grid mt-2">
        <Label htmlFor="email" className="text-xs text-gray-500 ">
          이메일
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="이메일을 입력해 주세요."
          className="h-12 pl-3 placeholder:text-gray-400 placeholder:text-sm mt-2 rounded-lg border border-gray-300"
          required
        />
      </div>
      <div className="grid mt-2">
        <Label htmlFor="userName" className="text-xs text-gray-500 ">
          닉네임
        </Label>
        <Input
          id="userName"
          type="text"
          placeholder="닉네임을 입력해 주세요."
          className="h-12 pl-3 placeholder:text-gray-400 placeholder:text-sm mt-2 rounded-lg border border-gray-300"
          required
        />
      </div>
      <div className="grid mt-2">
        <Label htmlFor="password" className="text-xs text-gray-500 ">
          비밀번호
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          className="h-12 pl-3 placeholder:text-gray-400 placeholder:text-sm mt-2 rounded-lg border border-gray-300"
          required
        />
      </div>
      <div className="grid mt-2">
        <Label htmlFor="checkPassword" className="text-xs text-gray-500 ">
          비밀번호 확인
        </Label>
        <Input
          id="chackPassword"
          type="password"
          placeholder="다시 한번 비밀번호를 입력해 주세요."
          className="h-12 pl-3 placeholder:text-gray-400 placeholder:text-sm mt-2 rounded-lg border border-gray-300"
          required
        />
      </div>
      <div className="flex flex-col mt-5">
        <div className="flex space-x-2 items-center">
          <Checkbox
            id="rememberEmail"
            className="w-[22px] h-[22px] rounded-sm border-gray-300 bg-white"
          />
          <label
            htmlFor="rememberEmail"
            className="text-xs font-bold underline text-gray-500"
          >
            개인정보처리방침에 동의
          </label>
        </div>
        <div className="flex space-x-2 items-center mt-2">
          <Checkbox
            id="agreeTerms"
            className="w-[22px] h-[22px] rounded-sm border-gray-300 bg-white"
          />
          <label
            htmlFor="agreeTerms"
            className="text-xs font-bold underline text-gray-500"
          >
            이용 약관에 동의
          </label>
        </div>
      </div>
      <Button
        type="submit"
        className="w-full bg-teal text-white text-sm h-10 mt-6 rounded-md"
      >
        회원가입
      </Button>
    </form>
  );
}
