"use client";

import Image from "next/image";
import logo from "@/public/imgs/Logo.svg";
import Link from "next/link";
import home_background_img from "@/public/imgs/noisy-gradients.svg";
import { A2HS } from "@/src/components/home/A2HS";
import { Button } from "@/src/components/shadcn/components/ui/button";
import InstallPrompt from "@/src/components/home/InstallPrompt";
import home_background_img_dark from "@/public/imgs/noisy-gradients-dark.png";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const bgImageSrc =
    theme === "dark" ? home_background_img_dark.src : home_background_img.src;
  return (
    <section
      className="flex-grow-1 flex w-full justify-center rounded-[20px] py-[203px] lg:pb-[359px] lg:pt-[311px] shadow-md"
      style={{
        backgroundImage: `url(${bgImageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center px-[60px] sm:px-8 md:px-16">
        <div className="w-full max-w-[250px] sm:max-w-[390px] lg:max-w-[600px]">
          <Image
            src={logo}
            alt="Signal Buddy 로고"
            width={390}
            height={70}
            layout="responsive"
            objectFit="contain"
          />
          <h2 className="font-Overpass text-gray-700 mt-4 text-[20px] font-bold sm:mt-2 sm:text-[40px] md:text-[50px]">
            A Walking Partner for All
          </h2>
          <p className="text-gray-600 mt-[17px] w-full text-center sm:mt-[14px] sm:text-left lg:w-[775px] lg:text-xl">
            <strong>“모두를 위한 보행 파트너”</strong>는 누구나 안전하고
            편리하게 이동할 수 있도록 돕는 서비스입니다. 보행 데이터를 분석해
            맞춤형 경로를 제공하며, 이동의 즐거움을 더하는 스마트한 기능을
            제공합니다.
          </p>
          <div className="flex gap-2 items-center justify-center mt-10 ">
            <div>
              <Link href="/map" passHref>
                <Button className=" h-[50px] min-w-[120px] sm:w-[200px] w-full rounded-lg bg-black font-bold text-white hover:text-black hover:bg-white sm:mx-0 sm:h-[50px] sm:text-xl">
                  지도로 바로가기
                </Button>
              </Link>
            </div>
            <A2HS />
            {/* <InstallPrompt /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
