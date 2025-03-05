"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from "@/public/imgs/Logo.png";
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
import { PasswordInput } from "../password-input";
import { useEffect } from "react";
import { toast } from "sonner";

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "비밀번호를 최소 8자 이상 입력해주세요." })
      .max(50, { message: "최대 50자까지 입력 가능합니다." })
      .refine(
        (pw) => {
          const hasLetters = /[A-Za-z]/.test(pw);
          const hasNumbers = /\d/.test(pw);
          const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(pw);

          const typesIncluded = [
            hasLetters,
            hasNumbers,
            hasSpecialChars,
          ].filter(Boolean).length;
          return typesIncluded >= 2;
        },
        {
          message: "영문, 숫자, 특수문자 중 2가지 이상 입력해주세요.",
        },
      ),

    passwordConfirm: z
      .string()
      .min(1, { message: "비밀번호 확인을 입력해주세요." }),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["pwConfirm"],
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
  });

export function ResetPassword() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("비밀번호 재설정:", values);
    // 비밀번호 재설정 로직 추가하기
  };

  const error = form.formState.errors;

  useEffect(() => {
    if (error) {
      const arr = Object.values(error)[0];
      if (arr) toast(arr.message);
    }
  }, [error]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-[362px] md:bg-white"
      >
        <div className="flex flex-col">
          <Image src={logo} alt="Signal Buddy 로고" width={206} height={38} />
          <p className="text-sm mt-4 text-gray-500">
            새로운 비밀번호를 재설정하세요.
          </p>
        </div>
        <div className="flex flex-col mt-[32px]">
          <div className="space-y-2">
            <FormField<{
              password: string;
              passwordConfirm: string;
            }>
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-gray-500">
                    비밀번호
                  </FormLabel>
                  <FormControl>
                    <PasswordInput field={field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField<{
              password: string;
              passwordConfirm: string;
            }>
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-gray-500">
                    비밀번호 확인
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      field={field}
                      placeholder="다시 한번 비밀번호를 입력해 주세요."
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-teal text-white text-sm h-10 mt-[148px] rounded-md mb-2"
          >
            재설정
          </Button>
        </div>
      </form>
    </Form>
  );
}
