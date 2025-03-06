"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/public/imgs/Logo.png";
import { useState } from "react";
import { EmailForm } from "./email-form";
import { OTPForm } from "./OTP-form";
import { useRouter } from "next/navigation";
import { sendAuthCode, verifyAuthCode } from "@/src/services/auth.service";
import { toast } from "sonner";
import axios from "axios";
import dayjs from "dayjs";

export function ResetPasswordVerification() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState<string>("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const isOtpComplete = otp.length === 6;

  const handleSendEmail = async (email: string) => {
    try {
      setLoading(true);
      const res = await sendAuthCode(email);
      const data = res.data;
      if (data) {
        toast("입력하신 이메일로 인증 코드를 보냈습니다.");
        setIsEmailSent(true);
        setEmail(email);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (enteredOtp: string) => {
    try {
      setLoading(true);
      if (!email) return toast("이메일이 유효하지 않습니다.");
      const body = {
        purpose: "NEW_PASSWORD",
        email,
        code: enteredOtp,
      };
      const res = await verifyAuthCode(body);
      const data = res.data;
      if (data) {
        toast("인증에 성공했습니다.");
        setVerified(true);
      }
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        toast(err.response.data.message || "알 수 없는 에러가 발생했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    // OTP 인증 성공 후 이동하도록 수정하기
    if (!email) return toast("이메일이 유효하지 않습니다.");
    const params = new URLSearchParams();
    params.set("email", email);
    const now = dayjs().format("YYYY-MM-DDTHH:mm:ss");
    params.set("date", now);
    router.push(`/reset-password/reset?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-[362px] md:theme-content-bg">
      <div className="flex flex-col">
        <Image
          src={logo}
          alt="Signal Buddy 로고"
          width={206}
          height={38}
          className="dark:invert"
        />
        <p className="text-sm mt-4 theme-label">
          이메일을 인증하고 비밀번호를 재설정하세요.
        </p>
      </div>
      <div className="flex flex-col mt-8">
        <EmailForm
          onEmailSend={handleSendEmail}
          isEmailSent={isEmailSent}
          loading={loading}
        />
        {isEmailSent && (
          <div className="mt-2">
            <OTPForm
              isOtpComplete={isOtpComplete}
              setOtpValue={setOtp}
              onSubmitOtp={handleOtpSubmit}
              loading={loading}
            />
          </div>
        )}
        <Button
          type="button"
          onClick={handleNext}
          className={`w-full  text-white text-sm h-10 mt-[148px] rounded-md mb-2 ${
            isOtpComplete ? "bg-teal" : "bg-gray-400"
          } ${isEmailSent ? "mt-[148px]" : "mt-[226px]"}`}
          disabled={!verified}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
