"use client";
import { CameraIcon } from "@/src/components/utils/icons";
import { User } from "next-auth";
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
import { useEffect, useState } from "react";
import Profile from "../common/profile/Profile";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "../auth/password-input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  changeProfileImg,
  changeUserInfo,
} from "@/src/services/members.service";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
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
      )
      .optional()
      .or(z.literal("")),
    passwordConfirm: z.string().optional().or(z.literal("")),
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

type Props = {
  user: User;
};

export default function ProfileEdit({ user }: Props) {
  const router = useRouter();
  const { update } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [profileFile, setProfileFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: user.nickname || "",
      password: "",
      passwordConfirm: "",
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
    const { nickname, password } = values;
    try {
      setLoading(true);
      const body = { nickname: nickname.trim() } as {
        password?: string;
        nickname: string;
      };
      if (password) body.password = password;
      if (profileFile) {
        const formData = new FormData();
        formData.append("imageFile", profileFile);
        const profileRes = await changeProfileImg(user.memberId, formData);
        await update({ profileImageUrl: profileRes.data.data });
      }
      const res = await changeUserInfo(user.memberId, body);
      if (res.data.data) {
        toast("프로필이 수정되었습니다.");
        await update(res.data.data);
        router.push("/my-page/profile");
      }
    } catch (err: unknown) {
      console.error(err);
      toast(err as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="flex justify-center">
        <label className="relative aspect-square w-[100px] cursor-pointer">
          <Profile
            src={
              profileFile
                ? URL.createObjectURL(profileFile)
                : user.profileImageUrl
            }
            size="3xl"
          />
          <div className="hover:bg-gray-300 outline-gray-300 absolute bottom-0 right-0 flex aspect-square w-[26px] cursor-pointer items-center justify-center rounded-full theme-content-bg outline outline-1">
            <CameraIcon className="aspect-square w-[18px]" />
          </div>
          <input type="file" className="hidden" onChange={handleChangeFile} />
        </label>
      </section>
      <section>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <div className="mb-2 flex flex-col gap-2">
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs theme-label ">
                      닉네임
                    </FormLabel>
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
            <div className="flex flex-col gap-2">
              <FormField<{
                nickname: string;
                password?: string | undefined;
                passwordConfirm?: string | undefined;
              }>
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs theme-label ">
                      새 비밀번호
                    </FormLabel>
                    <FormControl>
                      <PasswordInput field={field} hasBg />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <FormField<{
                nickname: string;
                password?: string | undefined;
                passwordConfirm?: string | undefined;
              }>
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-gray-500 ">
                      새 비밀번호 확인
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        field={field}
                        placeholder="다시 한번 비밀번호를 입력해 주세요."
                        hasBg
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-teal text-white text-sm h-10 mt-6 rounded-md mb-2"
              disabled={loading}
            >
              수정
            </Button>
          </form>
        </Form>
      </section>
    </>
  );
}
