import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import logo from "@/public/imgs/Logo.png";
import Link from "next/link";
import googleLogo from "@/public/imgs/Google.svg";
import kakaoLogo from "@/public/imgs/Kakao.svg";
import naverLogo from "@/public/imgs/Naver.svg";



export function LoginForm() {
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
                  네이버, 카카오, 구글 통합 회원으로 로그인이 가능합니다.
                </p>
              </div>
              <div className="grid mt-8">
                <Label htmlFor="email" className="text-xs text-gray-500 ">
                  이메일
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="이메일을 입력해 주세요."
                  className="h-12 pl-3 placeholder:text-gray-400 placeholder:text-sm mt-2 rounded-lg border border-gray-300 "
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

<div className="flex items-center justify-between mt-5">
                <div className=" flex space-x-2 items-center">
                  <Checkbox id="rememberEmail" className="w-[22px] h-[22px] rounded-sm border-gray-300 bg-white" />

                    <label
                      htmlFor="rememberEmail"
                      className="text-xs font-medium text-gray-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      이메일 기억하기
                    </label>
                  </div>
                  <Link
                    href="/reset-password"
                    className="text-xs font-medium text-gray-500 ml-auto underline-offset-2 hover:underline"
                  >
                    비밀번호 재설정
                  </Link>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-teal text-white text-sm h-10 mt-6 rounded-md"
              >
                로그인
              </Button>
              <div className="text-center text-xs mt-4">
                <Link href="/join" className="font-medium text-gray-500">
                  회원가입
                </Link>
              </div>
              <div className="flex items-center mt-[60px]">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-2 text-gray-500 font-Pretendard text-xs">
                  SNS 로그인
                </span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <div className="flex justify-center gap-5 mt-[18px]">

                <Button variant="outline" className="w-10 h-10 p-[10px] flex items-center justify-center rounded-full bg-[#1DC800]">
                <Image src={naverLogo} alt="naver logo" />
                  <span className="sr-only">네이버 계정으로 로그인</span>
                </Button>
                <Button variant="outline" className="w-10 h-10 p-2 flex items-center justify-center rounded-full bg-[#FEE500]">
                  <Image src={kakaoLogo} alt="kakao logo" />
                  <span className="sr-only">카카오 계정으로 로그인</span>
                </Button>
                <Button variant="outline" className="w-10 h-10 p-2 flex items-center justify-center rounded-full bg-white border-gray-300">
                <Image src={googleLogo} alt="google logo"/>

                  <span className="sr-only">구글 계정으로 로그인</span>
                </Button>
              </div>
          </form>
  );
}
