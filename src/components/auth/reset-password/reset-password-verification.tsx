"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/public/imgs/Logo.png";
import { useState } from "react";
import { EmailForm } from "./email-form";
import { OTPForm } from "./OTP-form";
import { useRouter } from "next/navigation";

export function ResetPasswordVerification() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const isOtpComplete = otp.length === 6;

  const handleSendEmail = (email: string) => {
    console.log("이메일 제출:", email);
    setIsEmailSent(true);
  };

  const handleOtpSubmit = (enteredOtp: string) => {
    console.log("OTP 제출:", enteredOtp);
    // OTP 인증 로직 추가
  };

  const handleNext = () => {
    // OTP 인증 성공 후 이동하도록 수정하기
    router.push("/reset-password/reset");
  };

  return (
    <div className="w-full max-w-[362px] md:bg-white">
      <div className="flex flex-col">
        <Image src={logo} alt="Signal Buddy 로고" width={206} height={38} />
        <p className="text-sm mt-4 text-gray-500">
          이메일을 인증하고 비밀번호를 재설정하세요.
        </p>
      </div>
      <div className="flex flex-col mt-8">
        <EmailForm onEmailSend={handleSendEmail} isEmailSent={isEmailSent} />
        {isEmailSent && (
          <div className="mt-2">
            <OTPForm
              isOtpComplete={isOtpComplete}
              setOtpValue={setOtp}
              onSubmitOtp={handleOtpSubmit}
            />
          </div>
        )}
        <Button
          type="button"
          onClick={handleNext}
          className={`w-full  text-white text-sm h-10 mt-[148px] rounded-md mb-2 ${
            isOtpComplete ? "bg-teal" : "bg-gray-400"
          } ${isEmailSent ? "mt-[148px]" : "mt-[226px]"}`}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
