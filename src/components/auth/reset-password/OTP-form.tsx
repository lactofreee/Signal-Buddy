"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { toast } from "sonner";

const otpSchema = z.object({
  otp: z.string().length(6, { message: "6자리 인증번호를 입력해주세요." }),
});

export function OTPForm({
  isOtpComplete,
  loading,
  setOtpValue,
  onSubmitOtp,
}: {
  isOtpComplete: boolean;
  loading: boolean;
  setOtpValue: (value: string) => void;
  onSubmitOtp: (otp: string) => void;
}) {
  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const error = form.formState.errors;

  useEffect(() => {
    if (error) {
      const arr = Object.values(error)[0];
      if (arr) toast(arr.message);
    }
  }, [error]);

  const handleOtpChange = (value: string) => {
    setOtpValue(value);
    form.setValue("otp", value);
  };

  const onSubmit = (values: z.infer<typeof otpSchema>) => {
    onSubmitOtp(values.otp);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs text-gray-500">인증번호</FormLabel>
              <div className="flex w-full max-w-sm items-center">
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    onChange={(value) => {
                      handleOtpChange(value);
                      field.onChange(value);
                    }}
                  >
                    <InputOTPGroup className="w-full">
                      <InputOTPSlot
                        index={0}
                        className="border theme-line theme-content-bg h-12 w-1/6 rounded-l-lg"
                      />
                      <InputOTPSlot
                        index={1}
                        className="border-y border-r theme-line theme-content-bg h-12 w-1/6"
                      />
                      <InputOTPSlot
                        index={2}
                        className="border-y theme-line theme-content-bg h-12 w-1/6"
                      />
                      <InputOTPSlot
                        index={3}
                        className="border-y theme-line theme-content-bg h-12 w-1/6"
                      />
                      <InputOTPSlot
                        index={4}
                        className="border-y theme-line theme-content-bg h-12 w-1/6"
                      />
                      <InputOTPSlot
                        index={5}
                        className="border-y theme-line theme-content-bg h-12 w-1/6 rounded-r-lg"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <Button
                  type="submit"
                  className={`w-full max-w-[84px] h-12 rounded-lg text-white font-bold text-sm ml-1 ${
                    isOtpComplete ? "bg-teal" : "bg-gray-400"
                  }`}
                  disabled={loading}
                >
                  인증
                </Button>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
