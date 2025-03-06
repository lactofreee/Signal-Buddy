"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import googleLogo from "@/public/imgs/Google.svg";
import kakaoLogo from "@/public/imgs/Kakao.svg";
import naverLogo from "@/public/imgs/Naver.svg";
import { signIn } from "next-auth/react";

export function SocialLogin() {
  return (
    <div>
      <div className="flex items-center mt-[60px]">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-2 theme-label font-Pretendard text-xs">
          SNS 로그인
        </span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <div className="flex justify-center gap-5 mt-[18px]">
        <Button
          onClick={() => signIn("naver")}
          type="button"
          variant="outline"
          className="w-10 h-10 p-[10px] flex items-center justify-center rounded-full bg-[#1DC800]"
        >
          <Image src={naverLogo} alt="naver logo" />
          <span className="sr-only">네이버 계정으로 로그인</span>
        </Button>
        <Button
          onClick={() => signIn("kakao")}
          type="button"
          variant="outline"
          className="w-10 h-10 p-2 flex items-center justify-center rounded-full bg-[#FEE500]"
        >
          <Image src={kakaoLogo} alt="kakao logo" />
          <span className="sr-only">카카오 계정으로 로그인</span>
        </Button>
        <Button
          onClick={() => signIn("google")}
          type="button"
          variant="outline"
          className="w-10 h-10 p-2 flex items-center justify-center rounded-full bg-white border-gray-300"
        >
          <Image src={googleLogo} alt="google logo" />

          <span className="sr-only">구글 계정으로 로그인</span>
        </Button>
      </div>
    </div>
  );
}
