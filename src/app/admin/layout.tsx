import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar";
import { AppSidebar } from "@/src/components/admin/ui/app-sidebar";
import { PanelLeftClose } from "lucide-react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-300">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex w-full flex-col min-w-[950px]">
          <div className="flex h-[50px] items-center justify-between theme-bg px-5">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="flex aspect-square w-[20px] items-center justify-center text-gray-400">
                <PanelLeftClose />
              </SidebarTrigger>
              <div className="text-gray-300">|</div>
              <p className="text-sm font-semibold text-gray-500">대시보드</p>
            </div>
            <p className="text-sm font-semibold text-gray-700">로그아웃</p>
          </div>
          <div className="mx-5 mb-[22px] mt-[23px] h-full rounded-xl theme-bg px-[12px] py-[10px] min-w-[1200px]">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
