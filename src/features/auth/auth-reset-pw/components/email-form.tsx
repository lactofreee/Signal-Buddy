"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/src/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { toast } from "sonner";
import { resetPwEamilFormSchema } from "../actions";

export function EmailForm({
  onEmailSend,
  isEmailSent,
  loading,
}: {
  onEmailSend: (email: string) => void;
  isEmailSent: boolean;
  loading: boolean;
}) {
  const form = useForm<z.infer<typeof resetPwEamilFormSchema>>({
    resolver: zodResolver(resetPwEamilFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const error = form.formState.errors;

  useEffect(() => {
    if (error) {
      const arr = Object.values(error)[0];
      if (arr) toast(arr.message);
    }
  }, [error]);

  const onSubmit = (values: z.infer<typeof resetPwEamilFormSchema>) => {
    console.log("EmailForm 제출:", values.email);
    onEmailSend(values.email);
    // 실제 이메일 전송 API 호출 로직 넣기
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs theme-label self-start">
                이메일
              </FormLabel>
              <div className="flex w-full max-w-sm items-center mt-2">
                <FormControl>
                  <Input
                    placeholder="이메일을 입력해 주세요"
                    className="max-w-[274px] h-12 pl-3 placeholder:text-gray-400 placeholder:text-sm rounded-lg border theme-line theme-content-bg mr-1"
                    {...field}
                  />
                </FormControl>
                <Button
                  type="submit"
                  className="bg-teal w-full max-w-[84px] h-12 rounded-lg text-white font-bold text-sm theme-auth-reset-password-button"
                  disabled={loading}
                >
                  {isEmailSent ? "재전송" : "전송"}
                </Button>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
