/**
 * v0 by Vercel.
 * @see https://v0.dev/t/cEQnMFIJLjE
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { AuthSideImage } from "../components/auth/auth-side-image/auth-side-image";
import { Card, CardContent } from "@/components/ui/card";

export default function Component() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <div
        className={
          "w-full max-w-[800px] flex flex-col gap-6 md:theme-content-bg rounded-lg overflow-hidden"
        }
      >
        <Card className="overflow-hidden border-none shadow-lg">
          <CardContent className="grid min-h-[580px] p-0 md:grid-cols-2 theme-bg md:theme-content-bg">
            <div className="flex max-w-[calc(100%-40px)] w-full mx-auto justify-center md:items-center md:mt-0 py-10">
              <div className="flex flex-1 flex-col items-center justify-center space-y-4 text-center md:items-start md:text-left">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                  Oops! <br />
                  Page not found.
                </h1>
                <p className="max-w-[450px] text-gray-500 dark:text-gray-400">
                  페이지가 존재하지 않습니다!
                </p>
                <Link
                  href="/"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  prefetch={false}
                >
                  Go to Homepage
                </Link>
              </div>
            </div>
            <AuthSideImage />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
