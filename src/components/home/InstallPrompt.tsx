"use client"

import React, { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<AppBannerPromptResult>;
}

interface AppBannerPromptResult {
  outcome: "accepted" | "dismissed";
  platform: string;
}

export default function InstallPrompt() {
  const [isShown, setIsShown] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // iOS 기기인지 확인
    const isDeviceIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);
    setIsIOS(isDeviceIOS);

    // Android의 PWA 설치 이벤트 감지
    const handleBeforeInstallPrompt = (e: Event) => {
      const event = e as BeforeInstallPromptEvent;
      event.preventDefault();
      setDeferredPrompt(event);
      setIsShown(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("PWA 설치 완료");
        } else {
          console.log("PWA 설치 취소");
        }
        setDeferredPrompt(null);
        setIsShown(false);
      });
    }
  };

  const closePrompt = () => {
    setIsShown(false);
  };

  if (!isShown && !isIOS) return null;

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-4">
      {isIOS ? (
        <div className="text-center">
          <p>📌 iOS 사용자는</p>
          <p>Safari에서 공유 버튼을 눌러</p>
          <p>홈 화면에 추가하세요.</p>
        </div>
      ) : (
        <div className="text-center">
          <p>📌 이 앱을 홈 화면에 추가할 수 있어요!</p>
          <button
            onClick={handleInstallClick}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            설치하기
          </button>
        </div>
      )}
      <button onClick={closePrompt} className="mt-2 text-gray-500 text-sm">
        닫기
      </button>
    </div>
  );
}
