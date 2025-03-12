"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import logo from "@/public/imgs/Logo.png";
import { CameraIcon } from "@/src/components/utils/icons";
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
import { useRouter, useSearchParams } from "next/navigation";
import { PasswordInput } from "../password-input";
import Profile from "../../common/profile/Profile";
import axios from "axios";

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "아이디를 입력해주세요." })
      .email({ message: "이메일 형식이 아닙니다." }),
    nickname: z
      .string()
      .min(1, { message: "닉네임을 입력해주세요." })
      .max(10, { message: "닉네임은 최대 10자까지 가능합니다." })
      .regex(/^\S+$/, "닉네임에는 공백을 포함할 수 없습니다."),
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
  const searchParams = useSearchParams();
  const provider = searchParams.get("provider");
  const id = searchParams.get("id");
  const nickname = searchParams.get("nickname");
  const email = searchParams.get("email");

  const [loading, setLoading] = useState<boolean>(false);
  const [profileFile, setProfileFile] = useState<File | null>(null);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email || "",
      nickname: nickname || "",
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

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files[0]) return;
    const file = files[0];
    setProfileFile(file);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, password, nickname } = values;
    try {
      setLoading(true);
      const body = {
        email: email.trim(),
        password: password.trim(),
        nickname: nickname.trim(),
      } as {
        [key: string]: string;
      };
      if (provider && id) {
        body.provider = provider;
        body.socialUserId = id;
      }

      const formData = new FormData();
      formData.append(
        "memberJoinRequest",
        new Blob([JSON.stringify(body)], {
          type: "application/json",
        }),
      );
      if (profileFile) {
        formData.append("profileImageUrl", profileFile);
      }

      const data = await join(formData);
      if (data.status === 200) {
        toast("성공적으로 회원가입 되었습니다.");
        router.push("/login");
      }
    } catch (err: unknown) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        toast(err.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
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
            시그널 버디에 오신 것을 환영합니다.
          </p>
        </div>
        <div className="flex flex-col items-center mt-8">
          <p className="self-start text-xs font-medium theme-label">
            프로필 이미지
          </p>
          <label className="relative aspect-square w-[100px] cursor-pointer">
            <Profile
              src={profileFile ? URL.createObjectURL(profileFile) : undefined}
              size="3xl"
            />
            <div className="hover:bg-gray-300 absolute bottom-0 right-0 flex aspect-square w-[26px] cursor-pointer items-center justify-center rounded-full outline outline-1 theme-content-bg theme-camera-border">
              <CameraIcon className="aspect-square w-[18px]" />
            </div>
            <input type="file" className="hidden" onChange={handleChangeFile} />
          </label>
        </div>
        <div className="grid mt-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs theme-label">이메일</FormLabel>
                <FormControl>
                  <Input
                    placeholder="이메일을 입력해 주세요."
                    className="h-12 pl-3 placeholder:text-gray-400 placeholder:text-sm mt-2 rounded-lg border theme-line theme-content-bg"
                    disabled={!!email}
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
                <FormLabel className="text-xs theme-label ">닉네임</FormLabel>
                <FormControl>
                  <Input
                    placeholder="닉네임을 입력해 주세요."
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
            nickname: string;
            password: string;
            passwordConfirm: string;
            agree: string[];
          }>
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs theme-label">비밀번호</FormLabel>
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
                <FormLabel className="text-xs theme-label ">
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
                link: "/terms/private",
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
          className="w-full bg-teal text-white text-sm h-10 mt-6 rounded-md mb-2 theme-auth-join-button"
          disabled={loading}
        >
          회원가입
        </Button>
      </form>
    </Form>
  );
}
