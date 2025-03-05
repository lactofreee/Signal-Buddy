import { Input } from "@/components/ui/input";
import { useState } from "react";
import eyeOpen from "@/public/imgs/eye-open.svg";
import eyeSlash from "@/public/imgs/eye-slash.svg";
import Image from "next/image";
import { ControllerRenderProps } from "react-hook-form";
import { cn } from "@/lib/utils";

interface PasswordInputProps {
  field: ControllerRenderProps<any, any>;
  placeholder?: string;
  hasBg?: boolean;
}

export function PasswordInput({
  field,
  placeholder,
  hasBg,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        placeholder={placeholder || "비밀번호를 입력해 주세요."}
        type={showPassword ? "text" : "password"}
        className={cn(
          "h-12 pl-3 pr-10 placeholder:text-gray-400 placeholder:text-sm mt-2 rounded-lg border border-gray-300",
          hasBg && "bg-white",
        )}
        {...field}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        {showPassword ? (
          <Image src={eyeOpen} alt="눈 뜬 아이콘" width={20} height={20} />
        ) : (
          <Image src={eyeSlash} alt="눈 감은 아이콘" width={20} height={20} />
        )}
      </button>
    </div>
  );
}
