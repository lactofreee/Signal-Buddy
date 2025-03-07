import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const headerList = await headers();
  const prefersDarkMode =
    headerList.get("sec-ch-prefers-color-scheme") === "dark";

  return {
    name: "Signal Buddy",
    short_name: "SignalBuddy",
    description: "모두를 위한 안전한 보행 파트너",
    start_url: "/",
    display: "standalone",
    background_color: "#8DB4AF",
    theme_color: prefersDarkMode ? "#18181B" : "#F3F3F3",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
