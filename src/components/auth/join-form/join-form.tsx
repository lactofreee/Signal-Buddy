"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import logo from "@/public/imgs/Logo.png";
import defaultProfile from "@/public/imgs/DefaultProfile.png";
import cameraIcon from "@/public/imgs/Camera.png";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { CheckboxGroup } from "../../common/form/CheckboxGroup";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { join } from "@/src/services/auth.service";
import { useRouter } from "next/navigation";
import { PasswordInput } from "../password-input";

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "아이디를 입력해주세요." })
      .email({ message: "이메일 형식이 아닙니다." }),
    nickname: z
      .string()
      .min(1, { message: "닉네임을 입력해주세요." })
      .max(10, { message: "닉네임은 최대 10자까지 가능합니다." }),
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
    agree: z.array(z.string()).refine((value) => value.length >= 2, {
      message: "약관을 모두 동의해주세요.",
    }),
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

export function JoinForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      passwordConfirm: "",
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, password, nickname } = values;
    try {
      setLoading(true);
      const body = { email, password, nickname };
      const formData = new FormData();
      formData.append(
        "memberJoinRequest",
        new Blob([JSON.stringify(body)], {
          type: "application/json",
        }),
      );

      const data = await join(formData);
      if (data.status === 200) {
        toast("성공적으로 회원가입 되었습니다.");
        router.push("/login");
      }
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-[360px] md:bg-white"
      >
        <div className="flex flex-col ">
          <Image src={logo} alt="Signal Buddy 로고" width={206} height={38} />
          <p className="text-sm mt-4 text-gray-500">
            시그널 버디에 오신 것을 환영합니다.
          </p>
        </div>
        <div className="flex flex-col items-center mt-8">
          <p className="self-start text-xs font-medium text-gray-500">
            프로필 이미지
          </p>
          <div className="relative w-[100px] h-[100px] rounded-full bg-white border border-gray-300 flex items-center justify-center mt-2">
            <Image
              src={defaultProfile}
              alt="프로필 이미지"
              width={58}
              height={58}
              className="object-cover"
            />
            <div className="absolute bottom-[8px] right-[4px] w-[26px] h-[26px] bg-white border border-gray-400 rounded-full flex items-center justify-center transform translate-x-1/4 translate-y-1/4">
              <label htmlFor="profileImage">
                <Image
                  src={cameraIcon}
                  alt="이미지 추가"
                  width={16}
                  height={14}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="grid mt-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-gray-500 ">이메일</FormLabel>
                <FormControl>
                  <Input
                    placeholder="이메일을 입력해 주세요."
                    className="h-12 pl-3 placeholder:text-gray-400 placeholder:text-sm mt-2 rounded-lg border border-gray-300"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="grid mt-2">
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-gray-500 ">닉네임</FormLabel>
                <FormControl>
                  <Input
                    placeholder="닉네임을 입력해 주세요."
                    className="h-12 pl-3 placeholder:text-gray-400 placeholder:text-sm mt-2 rounded-lg border border-gray-300"
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
            nickname: string;
            password: string;
            passwordConfirm: string;
            agree: string[];
          }>
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-gray-500 ">
                  비밀번호
                </FormLabel>
                <FormControl>
                  <PasswordInput field={field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="grid mt-2">
          <FormField<{
            email: string;
            nickname: string;
            password: string;
            passwordConfirm: string;
            agree: string[];
          }>
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-gray-500 ">
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
        <div className="flex flex-col mt-5">
          <CheckboxGroup
            control={form.control}
            name={"agree"}
            items={[
              {
                name: "개인정보처리방침에 동의",
                value: "terms",
                link: "/terms/services",
              },
              {
                name: "이용 약관에 동의",
                value: "policy",
                link: "/terms/policy",
              },
            ]}
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-teal text-white text-sm h-10 mt-6 rounded-md mb-2"
          disabled={loading}
        >
          회원가입
        </Button>
      </form>
    </Form>
  );
}
