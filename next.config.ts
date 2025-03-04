// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require("next-pwa")({
  dest: "public", // Service Worker와 캐시 파일을 저장할 경로
  register: true, // 브라우저에서 자동으로 등록
  skipWaiting: true, // 활성화 시 이전 SW 대기 없이 새 SW 적용
  disable: process.env.NODE_ENV === "development", // 개발 환경에서는 비활성화
});

const nextConfig = {
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
  },
};

module.exports = withPWA(nextConfig);
