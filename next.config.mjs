// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextPWA = (await import("next-pwa")).default;

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const withPlaiceholder = (await import("@plaiceholder/next")).default;
/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
  experimental: {
    turbo: {
      enabled: false, // Turbopack 비활성화
    },
  },
  images: {
    domains: [
      "randomuser.me",
      "s3-signal-buddy.s3.ap-northeast-2.amazonaws.com",
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default withPWA(withPlaiceholder(config));
