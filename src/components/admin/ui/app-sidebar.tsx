import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  LayoutGrid,
  Users,
  Files,
  FilePenLine,
  MessageCircleWarning,
  Megaphone,
  ClipboardList,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar";
import React from "react";
import Image from "next/image";

import logo_text from "@/public/imgs/logo.svg";
import logo_symbol from "@/public/imgs/logo-symbol-background-white.svg";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "대시보드",
    url: "/admin/dashboard", // 관리 대시보드
    icon: LayoutGrid,
  },
  {
    title: "회원관리",
    url: "/admin/users", // 사용자 관리 페이지
    icon: Users,
  },
  // {
  //   title: "포스트잇 관리",
  //   url: "/admin/postits", // 포스트잇 관리 페이지
  //   icon: Files,
  // },
  {
    title: "피드백 관리",
    url: "/admin/feedback", // 사용자 피드백 관리
    icon: FilePenLine,
  },
  {
    title: "신고 관리",
    url: "/admin/reports", // 신고 처리 관리
    icon: MessageCircleWarning,
  },
  {
    title: "고객센터",
    url: "/admin/support", // 고객 지원 관리
    icon: Megaphone,
  },
  {
    title: "약관 관리",
    url: "/admin/terms", // 약관 및 정책 관리
    icon: ClipboardList,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Link href={`/`} className="mb-2 flex gap-2">
              <Image
                src={logo_symbol}
                alt=""
                height={32}
                className="rounded-lg border border-gray-300"
                priority
              />
              <Image src={logo_text} alt="" width={80} priority />
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="font-semibold text-gray-500">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
