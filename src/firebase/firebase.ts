// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useEffect } from "react";
import { User } from "../types/feedback/feedbackList";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

const sendTokenToServer = async (userToken: string, deviceToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fcm/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken,
        },
        body: JSON.stringify({
          deviceToken,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("토큰 저장 실패");
    }
    const resData = await response.json();
    console.log("토큰이 백엔드에 성공적으로 저장됨", resData);
  } catch (error) {
    console.error("토큰 전송 중 오류 발생:", error);
  }
};

export const setTokenHandler = async (userToken: string) => {
  const messaging = getMessaging(app);
  const swRegistration = await navigator.serviceWorker.register(
    "/firebase-messaging-sw.js",
  );

  await getToken(messaging, {
    vapidKey: VAPID_KEY,
    serviceWorkerRegistration: swRegistration, // ✅ 등록된 SW 전달
  })
    .then(async (token) => {
      if (!token) {
        // 토큰 생성 불가시 처리할 내용, 주로 브라우저 푸시 허용이 안된 경우에 해당한다.
        console.error("토큰 생성 불가");
      } else {
        // 토큰을 받았다면 여기서 DB에 저장하면 됩니다.
        alert(`token:${token}`);
        console.log(token);
        sendTokenToServer(userToken, token);
        console.log("token: ", token);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const clickPushHandler = async (userToken: string) => {
  if (!("Notification" in window)) {
    console.log("이 브라우저는 푸시 알림을 지원하지 않습니다.");
    return;
  }

  if (Notification.permission === "granted") {
    console.log("이미 푸시 알림이 허용됨");
    return;
  } else if (Notification.permission === "denied") {
    alert("브라우저 설정에서 푸시 알림 차단을 해제해야 합니다.");
    return;
  }

  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    console.log("푸시 승인됨");
    setTokenHandler(userToken);
  } else if (permission === "denied") {
    console.log("푸시 거부됨");
  }
};

// export function useFCMNotification() {
//   useEffect(() => {
//     const messaging = getMessaging(app); // messaging 가져오기

//     const unsubscribe = onMessage(messaging, (payload) => {
//       console.log("포그라운드 메시지 수신: ", payload);

//       // payload.notification이 존재하는지 확인하고 처리
//       if (payload.notification) {
//         if (Notification.permission === "granted") {
//           new Notification(payload.notification.title ?? "알림", {
//             body: payload.notification.body ?? "내용 없음", // 기본 값 설정
//             icon: "/icon.png",
//           });
//         }
//       } else {
//         console.warn("notification 정보가 없습니다.");
//       }
//     });

//     return () => unsubscribe();
//   }, []);
// }
