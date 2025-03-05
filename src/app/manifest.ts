import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Signal Buddy",
    short_name: "SignalBuddy",
    description: "모두를 위한 안전한 보행 파트너",
    start_url: "/?homescreen=1",
    display: "standalone",
    background_color: "#8DB4AF",
    theme_color: "#FFFFFF",
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
