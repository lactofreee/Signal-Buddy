"use client"; // 클라이언트 전용 컴포넌트

import { useEffect } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import { app } from "../../firebase/firebase"; // Firebase 초기화된 app 가져오기

const FCMNotification = () => {
  useEffect(() => {
    const messaging = getMessaging(app); // messaging 가져오기

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("포그라운드 메시지 수신: ", payload);

      if (payload.notification) {
        if (Notification.permission === "granted") {
          new Notification(payload.notification.title ?? "알림", {
            body: payload.notification.body ?? "내용 없음",
            icon: "/icon.png",
          });
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
