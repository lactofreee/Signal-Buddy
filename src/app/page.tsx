"use client";

import { useSearchParams } from "next/navigation";
import logo_white from "../../public/imgs/Logo_Symbol_pwa.svg";
import logo_title from "../../public/imgs/Logo_white.svg";
import Image from "next/image";

export default function Home() {
  const searchParams = useSearchParams();
  const homescreen = searchParams.get("homescreen");

  return (
    <div className="h-screen flex justify-center ">
      <div className="min-w-screen w-full bg-teal pt-[300px]">
        {homescreen === "1" && (
          <div className="flex justify-center flex-col items-center">
            <Image src={logo_white} alt="로고" className="mb-[15px]" />
            <Image src={logo_title} alt="로고" className="mb-2" />
            <p className="text-sm font-normal text-gray-800">
              모두를 위한 보행 파트너
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
