"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import Image from "next/image";
import logo from "@/public/imgs/logo.png";
import Link from "next/link";
import { SocialLogin } from "./social-login";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/src/components/ui/form";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { setTokenHandler } from "@/src/firebase/firebase";
import { CheckboxGroup } from "@/src/components/common/checkbox-group";
import { PasswordInput } from "@/src/components/common/password-input";
import { login, loginFormSchema } from "../actions";

export function LoginForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      agree: [],
    },
  });

  const error = form.formState.errors;

  useEffect(() => {
    if (error) {
      const arr = Object.values(error)[0];
      if (arr) toast(arr.message);
    }
  }, [error]);

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      setLoading(true);
      const { email, password, agree } = values;

      const result = await login(email, password);

      if (result && result.error) {
        if (result.code) toast(result.code);
        else toast("이메일 혹은 비밀번호를 확인해주세요.");
      }
      if (agree.length) {
        localStorage.setItem("signal-email", email);
      } else {
        localStorage.removeItem("signal-email");
      }
    } catch (err) {
      console.error(err);
      toast(err as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storagedEmail = localStorage.getItem("signal-email");
    if (storagedEmail) {
      form.setValue("email", storagedEmail);
    }
    if (session && session.user) {
      toast("로그인에 성공했습니다.");
      setTokenHandler(session.user.token);
      redirect("/");
    }
  }, [form, session]);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-[360px] md:theme-content-bg"
        >
          <div className="flex flex-col ">
            <Image
              src={logo}
              alt="Signal Buddy 로고"
              width={206}
              height={38}
              className="dark:invert"
            />
            <p className="text-sm mt-4 theme-label">
              네이버, 카카오, 구글 통합 회원으로 로그인이 가능합니다.
            </p>
          </div>
          <div className="grid mt-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs theme-label ">이메일</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="이메일을 입력해 주세요."
                      className="h-12 pl-3 placeholder:text-gray-400 placeholder:text-sm mt-2 rounded-lg border theme-line theme-content-bg"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid mt-2">
            <FormField<{
              email: string;
              password: string;
              agree: string[];
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

            <div className="flex items-center justify-between mt-5">
              <div className=" flex space-x-2 items-center">
                <CheckboxGroup
                  control={form.control}
                  name={"agree"}
                  items={[
                    {
                      name: "이메일 기억하기",
                      value: "remember",
                    },
                  ]}
                />
              </div>
              <Link
                href="/reset-password/verify"
                className="text-xs font-medium theme-label-dark ml-auto underline-offset-2 hover:underline"
              >
                비밀번호 재설정
              </Link>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-teal text-white text-sm h-10 mt-6 rounded-md theme-auth-login-button"
            disabled={loading}
          >
            로그인
          </Button>
          <div className="text-center text-xs mt-4">
            <Link href="/join" className="font-medium theme-label">
              회원가입
            </Link>
          </div>
        </form>
      </Form>
      <SocialLogin />
    </div>
  );
}
