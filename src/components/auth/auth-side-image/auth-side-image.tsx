"use client";

import Image from "next/image";
import authSideImageLight from "@/public/imgs/LoginBackground.png";
import authSideImageDark from "@/public/imgs/auth-side-image-dark.png";
import logoSymbol from "@/public/imgs/Logo Symbol White.png";
import logoWhite from "@/public/imgs/Logo White.png";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function AuthSideImage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const sideImageSrc =
    theme === "dark" ? authSideImageDark : authSideImageLight;

  return (
    <div className="relative hidden bg-muted md:block ">
      <Image
        src={sideImageSrc}
        alt="login background image"
        fill
        className="object-cover"
        priority
      />
      <div
        className="absolute top-1/2 left-1/2 
      -translate-x-1/2 -translate-y-1/2
      flex flex-col items-center"
      >
        <Image src={logoSymbol} alt="logo symbol" priority></Image>
        <Image
          src={logoWhite}
          alt="white logo"
          className="mt-7"
          priority
        ></Image>
      </div>
    </div>
  );
}
