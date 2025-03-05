importScripts(
  "https://www.gstatic.com/firebasejs/9.0.2/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging-compat.js",
);

firebase.initializeApp({
  apiKey: "AIzaSyBOUqmXMk6SqnwTkQl46akwdOkwNbow3YM",
  authDomain: "signal-buddy-82c29.firebaseapp.com",
  projectId: "signal-buddy-82c29",
  storageBucket: "signal-buddy-82c29.firebasestorage.app",
  messagingSenderId: "242310213444",
  appId: "1:242310213444:web:9a9e7393be520407247111",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] 백그라운드 메시지 수신: ", payload);

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
  });
});
