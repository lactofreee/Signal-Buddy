"use client";

import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import logo from "@/public/imgs/common/logo-title-rg-black.png";
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
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import axios from "axios";
import { PasswordInput } from "@/src/components/common/password-input";
import { resetPW, resetPwFormSchema } from "../actions";

type Props = {
  searchparams?: { email: string; date: string };
};

export function ResetPassword({ searchparams }: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof resetPwFormSchema>>({
    resolver: zodResolver(resetPwFormSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof resetPwFormSchema>) => {
    try {
      if (!searchparams) return toast("이메일을 입력해주세요.");
      const { email } = searchparams;
      const res = await resetPW({ email, newPassword: values.password });
      const data = res.data;
      if (data) {
        toast("성공적으로 변경 되었습니다.");
        router.push("/login");
      }
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        toast(err.response.data.message || "알수 없는 에러가 발생했습니다.");
      }
    }
  };

  const error = form.formState.errors;

  useEffect(() => {
    if (error) {
      const arr = Object.values(error)[0];
      if (arr) toast(arr.message);
    }
  }, [error]);

  useEffect(() => {
    const validateSearchParams = () => {
      if (!searchparams) return false;

      const { email, date } = searchparams;
      if (!email || !date) return false;

      const currentTime = dayjs();
      const startTime = dayjs(date);
      const timeDiff = currentTime.diff(startTime, "minutes");

      return !isNaN(timeDiff) && timeDiff <= 5;
    };

    if (!validateSearchParams()) {
      toast("이메일 인증을 진행해주세요.");
      router.push("/reset-password/verify");
    }
  }, [router, searchparams]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-[362px] md:theme-content-bg"
      >
        <div className="flex flex-col">
          <Image
            src={logo}
            alt="Signal Buddy 로고"
            width={206}
            height={38}
            className="dark:invert"
          />
          <p className="text-sm mt-4 theme-label">
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
                  <FormLabel className="text-xs theme-label">
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
                  <FormLabel className="text-xs theme-label">
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
            className="w-full bg-teal text-white text-sm h-10 mt-[148px] rounded-md mb-2 theme-auth-reset-password-button"
          >
            재설정
          </Button>
        </div>
      </form>
    </Form>
  );
}
