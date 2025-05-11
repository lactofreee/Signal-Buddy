import { Input } from "@/src/components/ui/input";
import { useState } from "react";
import eyeOpen from "@/public/imgs/eye-open.svg";
import eyeSlash from "@/public/imgs/eye-slash.svg";
import Image from "next/image";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { cn } from "@/src/utils";

interface PasswordInputProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
  placeholder?: string;
  hasBg?: boolean;
}

export function PasswordInput<T extends FieldValues>({
  field,
  placeholder,
  hasBg,
}: PasswordInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        placeholder={placeholder || "비밀번호를 입력해 주세요."}
        type={showPassword ? "text" : "password"}
        className={cn(
          "h-12 pl-3 pr-10 placeholder:text-gray-400 placeholder:text-sm mt-2 rounded-lg border theme-line theme-content-bg",
          hasBg && "theme-content-bg",
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
