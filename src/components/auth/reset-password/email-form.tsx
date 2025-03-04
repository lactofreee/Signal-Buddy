"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "아이디를 입력해주세요." })
    .email({ message: "이메일 형식이 아닙니다." }),
});

export function EmailForm({
  onEmailSend,
  isEmailSent,
}: {
  onEmailSend: (email: string) => void;
  isEmailSent: boolean;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
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
              <FormLabel className="text-xs text-gray-500 self-start">
                이메일
              </FormLabel>
              <div className="flex w-full max-w-sm items-center mt-2">
                <FormControl>
                  <Input
                    placeholder="이메일을 입력해 주세요"
                    className="max-w-[274px] h-12 pl-3 placeholder:text-gray-400 placeholder:text-sm rounded-lg border border-gray-300 mr-1"
                    {...field}
                  />
                </FormControl>
                <Button
                  type="submit"
                  className="bg-teal w-full max-w-[84px] h-12 rounded-lg text-white font-bold text-sm"
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
