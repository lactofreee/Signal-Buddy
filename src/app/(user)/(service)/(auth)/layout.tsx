import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { AuthSideImage } from "@/src/components/auth/auth-side-image/auth-side-image";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[calc(100vw-32px)] max-w-[1240px] overflow-hidden md:rounded-[20px] md:w-[calc(100vw-60px)] md:shadow-lg">
        <div className={cn("flex flex-col gap-6 md:theme-content-bg")}>
          <Card className="overflow-hidden border-none shadow-none ">
            <CardContent className="grid min-h-[770px] p-0 md:grid-cols-2 theme-bg md:theme-content-bg">
              <div className="flex max-w-[calc(100%-16px)] w-full mx-auto justify-center md:items-center md:mt-0 py-10">
                {children}
              </div>
              <AuthSideImage />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
