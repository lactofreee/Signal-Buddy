"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
  src?: string | null;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "2md";
};

const DEFATUL_PROFILE = "/imgs/DefaultProfile.png";

const AVATAR_SIZES = {
  xs: "w-4 h-4 min-w-4 min-h-4",
  sm: "w-6 h-6 min-w-6 min-h-6",
  md: "w-8 h-8 min-w-8 min-h-8",
  lg: "w-10 h-10 min-w-10 min-h-10",
  xl: "w-12 h-12 min-w-12 min-h-12",
  "2md": "w-[38px] h-[38px] min-w-8 min-h-8",
  "2xl": "w-16 h-16 min-w-16 min-h-16",
  "3xl": "w-18 h-18 min-w-18 min-h-18",
};

export default function Profile({ src, size = "md" }: Props) {
  return (
    <Avatar
      className={cn("bg-white border border-gray-300", AVATAR_SIZES[size])}
    >
      <AvatarImage src={src ? src : DEFATUL_PROFILE} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
