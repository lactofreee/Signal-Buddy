"use client";

import * as React from "react";
import Logo_icon from "@/public/imgs/app_logo.svg";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function A2HS() {
  const [isIOS, setIsIOS] = React.useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    React.useState<BeforeInstallPromptEvent | null>(null);

  React.useEffect(() => {
    // iOS 기기인지 확인
    const userAgent = navigator.userAgent;
    const isDeviceIOS =
      /iPad|iPhone|iPod/.test(userAgent) && !("beforeinstallprompt" in window);
    setIsIOS(isDeviceIOS);

    // Android PWA 설치 이벤트 감지
    const handleBeforeInstallPrompt = (e: Event) => {
      const event = e as BeforeInstallPromptEvent;
      e.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === "accepted") {
          console.log("PWA 설치 완료");
        } else {
          console.log("PWA 설치 취소");
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="h-[50px] min-w-[120px] sm:w-[200px] rounded-lg bg-black font-bold text-white hover:text-black hover:bg-white sm:mx-0 sm:h-[50px] sm:text-xl border-none"
        >
          앱처럼 사용하기
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="flex justify-between items-center">
              <Image
                src={Logo_icon}
                alt="앱 로고 이미지입니다."
                width={80}
                height={80}
              />
              <div className="text-2xl flex-wrap w-[250px] text-gray-800 font-bold justify-start flex">
                <p>Signal Buddy 바로가기를</p>
                <p>추가하시겠습니까?</p>
              </div>
            </DrawerTitle>
          </DrawerHeader>

          <DrawerFooter>
            {isIOS ? (
              <div className="text-center text-gray-600">
                <p>📌 iOS 사용자는</p>
                <p>Safari에서 공유 버튼을 눌러</p>
                <p>홈 화면에 추가하세요.</p>
              </div>
            ) : (
              <Button
                className="bg-teal"
                onClick={handleInstall}
                disabled={!deferredPrompt}
              >
                추가하기
              </Button>
            )}
            <DrawerClose asChild>
              <Button variant="outline">취소</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
