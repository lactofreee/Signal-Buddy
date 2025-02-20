import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import logo from "@/public/imgs/Logo.png";

export function ResetPassword1() {
  return (
          <form className="w-[362px] md:bg-white">
            <div className="flex flex-col">
                <Image
                  src={logo}
                  alt="Signal Buddy 로고"
                  width={206}
                  height={38}
                />
                <p className="text-sm mt-4 text-gray-500">
                  이메일을 인증하고 비밀번호를 재설정하세요.
                </p>
              </div>
              <div className="flex flex-col mt-[32px]">
              <Label htmlFor="email" className="text-xs text-gray-500 self-start">
                  이메일
                </Label>
              <div className="flex w-full max-w-sm items-center  mt-2">
      <Input id="email" type="email" placeholder="이메일을 입력해 주세요" className="max-w-[274px] h-12 pl-3 placeholder:text-gray-400 placeholder:text-sm rounded-lg border border-gray-300 mr-1"
                  required/>
      <Button type="submit" className="bg-teal w-[84px] h-12 rounded-lg text-white font-bold text-sm" >전송</Button>
    </div>
              <Button
                type="submit"
                className="w-full bg-gray-400 text-white text-sm h-10 mt-[226px] rounded-md"
              >
                다음
              </Button>
            </div>
          </form>
  );
}