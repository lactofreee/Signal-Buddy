"use client"; // 클라이언트 전용 컴포넌트

import { useEffect } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import { app } from "../firebase/firebase"; // Firebase 초기화된 app 가져오기
import logo_icon from "@/public/icon-512x512.png";

const FCMNotification = () => {
  useEffect(() => {
    const messaging = getMessaging(app); // messaging 가져오기

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("포그라운드 메시지 수신: ", payload);

      if (payload.notification && payload.data) {
        const feedbackId = payload.data.feedbackId;

        const title = payload.notification.title ?? "제목 없음";
        const options = {
          body: payload.notification.body ?? "내용 없음",
          icon: "@/public/icon-512x512.png",
          data: {
            url:
              `https://signal-buddy.vercel.app/feedback/${feedbackId}` ||
              `https://signal-buddy.vercel.app/feedback/`,
          },
        };

        if (Notification.permission === "granted") {
          const notification = new Notification(title, options);

          notification.onclick = (event) => {
            event.preventDefault();
            window.open(notification.data.url);
          };
        }
      } else {
        console.warn("notification 정보가 없습니다.");
      }
    });

    return () => unsubscribe();
  }, []);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
};

export default FCMNotification;
