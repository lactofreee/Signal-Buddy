import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { AuthSideImage } from "@/src/components/auth-side-image/auth-side-image";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[calc(100vw-32px)] max-w-[1240px] overflow-hidden rounded-[20px] md:w-[calc(100vw-60px)] md:shadow-lg">
        <div className={cn("flex flex-col gap-6 md:max-h-[770px] md:bg-white")}>
          <Card className="overflow-hidden border-none shadow-none">
            <CardContent className="grid h-[770px] p-0 md:grid-cols-2">
              <div className="flex items-center justify-center">{children}</div>
              <AuthSideImage />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
