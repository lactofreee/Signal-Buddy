import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import RootProvider from "../contexts/RootProvider";
import FCMNotification from "../components/fcm/FCMNotification";
import { Providers } from "../components/display-mode/ThemeProvider";
import ThemeColorUpdater from "../components/home/ThemeColorUpdater";

export const metadata: Metadata = {
  title: "Signal Buddy | 모두를 위한 보행 파트너",
  description: "Signal Buddy | 모두를 위한 보행 파트너",
  icons: {
    icon: "/icon-192x192-rounded.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <Script src="https://code.jquery.com/jquery-3.2.1.min.js" />
        <Script
          src={`https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${process.env.TMAP_API_KEY}`}
          strategy="beforeInteractive"
        />
        <Script
          src="https://topopentile1.tmap.co.kr/scriptSDKV2/tmapjs2.min.js?version=20231206"
          strategy="beforeInteractive"
        />
        <meta name="theme-color" content="#18181B" />
      </head>
      <RootProvider>
        <body
          className="theme-bg flex min-h-screen flex-col font-Pretendard antialiased"
          cz-shortcut-listen="true"
        >
          <Providers>
            <FCMNotification />
            {children}
            <Toaster />
          </Providers>
        </body>
      </RootProvider>
      <ThemeColorUpdater />
    </html>
  );
}
