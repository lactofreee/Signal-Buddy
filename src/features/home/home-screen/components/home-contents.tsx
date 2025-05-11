"use client";
import Image from "next/image";
import logo from "@/public/imgs/logo.svg";
import Link from "next/link";
import { A2HS } from "@/src/features/home/home-pwa/components/home-pwa-A2HS-popup";
import { Button } from "@/src/components/ui/button";
import home_background_img from "@/public/imgs/noisy-gradients.jpg";
import home_background_img_dark from "@/public/imgs/noisy-gradients-dark.jpg";
import { PlaiceholderType } from "@/src/utils/getBase64";
import useThemeDisplay from "@/src/hooks/use-theme-display";

type Props = {
  darkImage: PlaiceholderType & {
    img: { src: string; height: number; width: number };
  };
  lightImage: PlaiceholderType & {
    img: { src: string; height: number; width: number };
  };
};

export default function HomeContents({ darkImage, lightImage }: Props) {
  const { theme, resolvedTheme, mounted } = useThemeDisplay();

  if (!mounted) {
    return null;
  }

  const bgImageSrc =
    theme === "system"
      ? resolvedTheme === "dark"
        ? home_background_img_dark.src
        : home_background_img.src
      : theme === "dark"
        ? home_background_img_dark.src
        : home_background_img.src;

  const bgImageDataUrl =
    theme === "system"
      ? resolvedTheme === "dark"
        ? darkImage
        : lightImage
      : theme === "dark"
        ? darkImage
        : lightImage;

  return (
    <section className="flex-grow-1 flex w-full justify-center overflow-hidden rounded-[20px] shadow-md relative">
      <Image
        src={bgImageSrc}
        alt="main background"
        className="cover -z-10 max-h-screen aspect-[9/16] lg:aspect-[5/3]"
        placeholder="blur"
        layout="responsive"
        blurDataURL={bgImageDataUrl.base64}
        width={bgImageDataUrl.img.width}
        height={bgImageDataUrl.img.height}
        priority
      />
      <div className="flex flex-col items-center px-[60px] sm:px-8 md:px-16 w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image
          src={logo}
          alt="Signal Buddy 로고"
          width={390}
          height={70}
          layout="responsive"
          objectFit="contain"
          className="dark:invert max-w-[390px]"
        />
        <h2 className="font-Overpass theme-home-slogan mt-4 text-[20px] font-bold sm:mt-2 sm:text-[40px] md:text-[50px]">
          A Walking Partner for All
        </h2>
        <p className="theme-home-description break-keep mt-[17px] w-full text-center sm:mt-[14px] lg:w-[775px] lg:text-xl">
          <strong>“모두를 위한 보행 파트너”</strong>는 누구나 안전하고 편리하게
          이동할 수 있도록 돕는 서비스입니다. <br className="lg:block hidden" />{" "}
          보행 데이터를 분석해 맞춤형 경로를 제공하며, 이동의 즐거움을 더하는
          스마트한 기능을 제공합니다.
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
        </div>
      </div>
    </section>
  );
}
