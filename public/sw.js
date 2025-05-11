if (!self.define) {
  let e,
    s = {};
  const i = (i, a) => (
    (i = new URL(i + ".js", a).href),
    s[i] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = i), (e.onload = s), document.head.appendChild(e);
        } else (e = i), importScripts(i), s();
      }).then(() => {
        let e = s[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (a, n) => {
    const c =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[c]) return;
    let t = {};
    const r = (e) => i(e, c),
      d = { module: { uri: c }, exports: t, require: r };
    s[c] = Promise.all(a.map((e) => d[e] || r(e))).then((e) => (n(...e), t));
  };
}
define(["./workbox-1bb06f5e"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/app-build-manifest.json",
          revision: "92719836025bcf4854b7d0e935046a1f",
        },
        {
          url: "/_next/static/156LZ_kX67Ebz0zXsC4iB/_buildManifest.js",
          revision: "bfd18ce146653361daa92b08bce61812",
        },
        {
          url: "/_next/static/156LZ_kX67Ebz0zXsC4iB/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/1045-984baf47a89ecd88.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/1238-ee8b15c28537831b.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/1345-2730e262c497dfe0.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/1457-7281ffef273b8cc8.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/1517-0de3fb25e1755eb4.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/1745-5d6ebab37f371bdb.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/2794-754538bf719696fc.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/2844-fcd487c8d81cacbb.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/2935-21a7274ce4946069.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/3428-385e5d5b3d7a36fa.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/4047-35f572031ba8b3f9.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/41ade5dc-60559bff3fe34711.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/4232-d950718d6bc47d54.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/4853-c978062fb7b304cd.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/4bd1b696-40e11d146ebb8d7f.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/547-ff844f9454bd50ab.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/5614-42fedd765d1f00ae.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/602dbae6-adac2456a2bd5505.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/6932-290e4330c63a1e89.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/696-9c0e46ba37a4fa44.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/7510-6bc5e3d0efef34ac.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/7527-3efa8081aad52bd8.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/7951-c3646e4302a2a5a3.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/7970-18e8485e58de209a.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/814-ec7b634f59222e0e.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/8173-676c7c8395a24471.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/827-3cd8c977e737825e.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/8917-d9715fa84db8ea1b.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/8cc6faea-ba02c915777a7bf3.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/9547-b4bd3d6864220c79.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/(user)/(map)/layout-9574350092adc5ca.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/(user)/(map)/map/%5B%5B...slug%5D%5D/page-4269315caacbfdc8.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/(user)/(service)/(auth)/join/page-488e3b891575936a.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/(user)/(service)/(auth)/layout-740ec8a275690b23.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/(user)/(service)/(auth)/login/page-20f56bb4f4e2cad1.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/(user)/(service)/(auth)/reset-password/reset/page-8fe30792d180b8c8.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/(user)/(service)/(auth)/reset-password/verify/page-945fe8779307f5cf.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/(user)/(service)/feedback/%5Bid%5D/edit/page-ed98da50c27e67c2.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/(user)/(service)/feedback/%5Bid%5D/page-6b9e797dc5077e24.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/(user)/(service)/feedback/layout-360ddc2994d20562.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/(user)/(service)/feedback/page-fc469f2ac4b2a4f6.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/(user)/(service)/feedback/write/page-f8a275b6579d7028.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/(user)/(service)/layout-42d1e5d06d0a90a4.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/(user)/(service)/my-page/liked/page-9389cf1e2be27e8b.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/(user)/(service)/my-page/profile-edit/page-d8422612ab62c62d.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/(user)/(service)/my-page/profile/page-cb8cfec96b4cde89.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/(user)/(service)/my-page/settings/page-667aa2cf5789c41f.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/(user)/(service)/my-place/edit/page-5c89de528b2090d4.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/(user)/(service)/my-place/layout-bc5558c9f93ac366.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/(user)/(service)/my-place/page-13ea11983e275d70.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/(user)/(service)/page-89595141e5bd3996.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/(user)/(service)/postits/page-8844448696bea193.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/(user)/(service)/terms/layout-6132b4d28d87131a.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/(user)/(service)/terms/policy/page-8d64ef312cb8df35.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/(user)/(service)/terms/private/page-8c87225bdfebeb5f.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/(user)/(service)/users/page-4251377e20c145e9.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-48ab8a2d81389184.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/admin/dashboard/page-ea7c1623480fd38d.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/admin/feedback/page-b56a884c2c76a34e.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/admin/layout-21481505028e753c.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/admin/page-29717db9101756a1.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/admin/postits/page-c54fab5cc70a46cb.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/admin/reports/page-30801e6e51e32db9.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/admin/support/page-c91a7f3de9adf21e.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/admin/terms/page-93be7296f5e7f006.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/admin/users/page-30df444fcde1a4a6.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-45bf4e2d7925b335.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/api/tts/route-4083a187abab8d0e.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/layout-396d09adc9ddc621.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/app/not-found-7b05addd965c35cd.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/d648eb28-a96a60184d798530.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/framework-c8065bab8b311d0e.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/main-aebb514162ba63ab.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/main-app-4b9b5d86b97e98aa.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/pages/_app-5f03510007f8ee45.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/pages/_error-8efa4fbf3acc0458.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-a2f1ea47f5683cce.js",
          revision: "156LZ_kX67Ebz0zXsC4iB",
        },
        {
          url: "/_next/static/css/11663eb5ca3c6d95.css",
          revision: "11663eb5ca3c6d95",
        },
        {
          url: "/_next/static/css/f762623dc43a1a32.css",
          revision: "f762623dc43a1a32",
        },
        {
          url: "/_next/static/media/Delete.26aaa2f7.svg",
          revision: "979d6bc8d1ecd61d2ba112f823a3ad54",
        },
        {
          url: "/_next/static/media/Google.5813d93b.svg",
          revision: "606687118c802442b0376a3ce19cb081",
        },
        {
          url: "/_next/static/media/Kakao.d6a00152.svg",
          revision: "147ee1cebbc6dac52692cb9404f509bc",
        },
        {
          url: "/_next/static/media/LoginBackground.f95de7f8.png",
          revision: "31311d3c1af39145626afd733a98a20f",
        },
        {
          url: "/_next/static/media/Logo Symbol White.7701be75.png",
          revision: "53c80e26097f3002f363001721f4fff5",
        },
        {
          url: "/_next/static/media/Logo Symbol.674ada6f.png",
          revision: "5c63843d6a12563dae81af390f0e6627",
        },
        {
          url: "/_next/static/media/Logo White.bb21c083.png",
          revision: "6576a0a3b4dbe072b6817a5bc99ee8b8",
        },
        {
          url: "/_next/static/media/Logo.4dfd2429.png",
          revision: "34208a26849f6c803a8e481333f76daf",
        },
        {
          url: "/_next/static/media/Logo.835d26ad.svg",
          revision: "147829170879e28d60167e1ce9e05f31",
        },
        {
          url: "/_next/static/media/Naver.47985de4.svg",
          revision: "47676ed2a0b5bd70c6fee74b39c60a01",
        },
        {
          url: "/_next/static/media/app_logo.d385423b.svg",
          revision: "1d357eb7e8764709c91eeeabfa0ec573",
        },
        {
          url: "/_next/static/media/auth-side-image-dark.3bc69874.png",
          revision: "0d46d27b445adec8e13b834afe555870",
        },
        {
          url: "/_next/static/media/eye-open.9a94efd0.svg",
          revision: "740d8ba0cf25c8806ea004eec77a5f55",
        },
        {
          url: "/_next/static/media/eye-slash.434afd74.svg",
          revision: "6f9c983a65a71633157415739b3eb982",
        },
        {
          url: "/_next/static/media/liked-feedback.bcc6e176.svg",
          revision: "114daf3057777fbf9994d39fda032959",
        },
        {
          url: "/_next/static/media/logo-symbol-background-white.a2cb1de4.svg",
          revision: "6ff4b42190460a4c5a5c3f91dd4ec461",
        },
        {
          url: "/_next/static/media/my-feedback.07b06c78.svg",
          revision: "bb3e5b1eb87b19c48c126673edec387d",
        },
        {
          url: "/_next/static/media/noisy-gradients-dark.be9e6ab4.jpg",
          revision: "3ac33759fed332b555f8de93af0d93ab",
        },
        {
          url: "/_next/static/media/noisy-gradients.7baa052e.jpg",
          revision: "cf331a3736debff7710a2ffbb28661ee",
        },
        {
          url: "/_next/static/media/two-line-hamburger.ef29a615.svg",
          revision: "fe6d838fd2c3790e3e6f31d2506a84be",
        },
        {
          url: "/firebase-messaging-sw.js",
          revision: "8d424134ab4afac4da37658a5b7e1fe5",
        },
        {
          url: "/icon-192x192-rounded.png",
          revision: "4ec205f1af21661ab33ed24cbb589bdb",
        },
        {
          url: "/icon-192x192.png",
          revision: "e648bcbeeac4b96cbdce08e3cda27a13",
        },
        {
          url: "/icon-512x512.png",
          revision: "6c4be9f570b4db253c90f1aca2261930",
        },
        {
          url: "/imgs/Camera.png",
          revision: "3d7cbb604359eaf6eaa29cdd48e72a59",
        },
        {
          url: "/imgs/DefaultProfile.png",
          revision: "3a46c1465c97ec3b9698d52c4dfc5636",
        },
        {
          url: "/imgs/Delete.svg",
          revision: "979d6bc8d1ecd61d2ba112f823a3ad54",
        },
        {
          url: "/imgs/Google.svg",
          revision: "606687118c802442b0376a3ce19cb081",
        },
        {
          url: "/imgs/Kakao.svg",
          revision: "147ee1cebbc6dac52692cb9404f509bc",
        },
        {
          url: "/imgs/LoginBackground.png",
          revision: "31311d3c1af39145626afd733a98a20f",
        },
        {
          url: "/imgs/Logo Symbol White.png",
          revision: "53c80e26097f3002f363001721f4fff5",
        },
        {
          url: "/imgs/Logo Symbol.png",
          revision: "5c63843d6a12563dae81af390f0e6627",
        },
        {
          url: "/imgs/Logo White.png",
          revision: "6576a0a3b4dbe072b6817a5bc99ee8b8",
        },
        { url: "/imgs/logo.png", revision: "34208a26849f6c803a8e481333f76daf" },
        { url: "/imgs/Logo.svg", revision: "147829170879e28d60167e1ce9e05f31" },
        {
          url: "/imgs/Logo_Symbol_pwa.svg",
          revision: "f4ba75ad677f9c93dda64fdadaac1c79",
        },
        {
          url: "/imgs/Logo_white.svg",
          revision: "97505e99d4ce4b2bf3230173ead25f88",
        },
        {
          url: "/imgs/Naver.svg",
          revision: "47676ed2a0b5bd70c6fee74b39c60a01",
        },
        {
          url: "/imgs/all-direction.svg",
          revision: "3d966abf0435eb7a829de8fa1df181ce",
        },
        {
          url: "/imgs/app_logo.svg",
          revision: "1d357eb7e8764709c91eeeabfa0ec573",
        },
        {
          url: "/imgs/auth-side-image-dark.png",
          revision: "0d46d27b445adec8e13b834afe555870",
        },
        {
          url: "/imgs/click-marker.png",
          revision: "eb49676e8c6da396b3501cf5787ffc81",
        },
        {
          url: "/imgs/click-poi-marker.png",
          revision: "e122694bbeea645b8f4e65d22912d69e",
        },
        {
          url: "/imgs/cross-marker.png",
          revision: "36c33fb6168555083684f393e4cb6ff2",
        },
        {
          url: "/imgs/current-marker.png",
          revision: "f63141c67146729ce206bdeffdcc8c55",
        },
        {
          url: "/imgs/end-marker.png",
          revision: "7f387bd88a2dd3d9594e78427ab621e2",
        },
        {
          url: "/imgs/eye-open.svg",
          revision: "740d8ba0cf25c8806ea004eec77a5f55",
        },
        {
          url: "/imgs/eye-slash.svg",
          revision: "6f9c983a65a71633157415739b3eb982",
        },
        {
          url: "/imgs/liked-feedback.svg",
          revision: "114daf3057777fbf9994d39fda032959",
        },
        {
          url: "/imgs/liked-postit.svg",
          revision: "ccf93c2861d4eda1c02015257db16d13",
        },
        {
          url: "/imgs/logo-symbol-background-white.svg",
          revision: "6ff4b42190460a4c5a5c3f91dd4ec461",
        },
        {
          url: "/imgs/my-feedback.svg",
          revision: "bb3e5b1eb87b19c48c126673edec387d",
        },
        {
          url: "/imgs/my-postit.svg",
          revision: "3daad11a1824229ed845baa95f373661",
        },
        {
          url: "/imgs/nav-left.png",
          revision: "ece5e80fc5d6e0ecf3c2a9c77e06a993",
        },
        {
          url: "/imgs/nav-left.svg",
          revision: "c186576ae8fbaf6ca70f454c74a549df",
        },
        {
          url: "/imgs/nav-right.png",
          revision: "424bc71d096fcebbaebd5b5fd08bbcc1",
        },
        {
          url: "/imgs/nav-right.svg",
          revision: "fca2191eee2f64aa6010e1f62bc51585",
        },
        {
          url: "/imgs/nav-straight.png",
          revision: "7934cc37079fe4fd8c8c7995d6a1e01c",
        },
        {
          url: "/imgs/nav-straight.svg",
          revision: "1854d3fad2132a821cc615fd5154b2e5",
        },
        {
          url: "/imgs/nav-u-turn.png",
          revision: "7b0a53da410696d342f4b04a0690bbd8",
        },
        {
          url: "/imgs/nav-u-turn.svg",
          revision: "7b0a53da410696d342f4b04a0690bbd8",
        },
        {
          url: "/imgs/nav-walk.svg",
          revision: "ad8312d72f85ad3a9120cb883e200e90",
        },
        {
          url: "/imgs/noisy-gradients-dark.jpg",
          revision: "3ac33759fed332b555f8de93af0d93ab",
        },
        {
          url: "/imgs/noisy-gradients-dark.png",
          revision: "449ac654115c27522366fa2b059c6851",
        },
        {
          url: "/imgs/noisy-gradients.jpg",
          revision: "cf331a3736debff7710a2ffbb28661ee",
        },
        {
          url: "/imgs/noisy-gradients.png",
          revision: "22d01d04d90d07788c8a0ea17d626baf",
        },
        {
          url: "/imgs/poi-marker.png",
          revision: "0420a62e7ef4d3187ad5936f2dc649b0",
        },
        {
          url: "/imgs/sm-logo.svg",
          revision: "54e8e91834e3b3fa4f6ec6dbc52990a8",
        },
        {
          url: "/imgs/start-marker.png",
          revision: "15ad4e7821bcad3287f07030312674e4",
        },
        {
          url: "/imgs/two-line-hamburger.svg",
          revision: "fe6d838fd2c3790e3e6f31d2506a84be",
        },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: i,
              state: a,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET",
    );
});
