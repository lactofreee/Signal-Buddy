import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { Toaster } from "@/src/components/ui/sonner";
import RootProvider from "../contexts/RootProvider";
import FCMNotification from "../hooks/use-fcm-notification";
import { Providers } from "@/src/features/my-page/my-page-setting/components/my-page-theme-provider";
import ThemeColorUpdater from "../hooks/use-theme-color-updater";
import { getMetadata } from "../utils";
export const metadata: Metadata = getMetadata();

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
