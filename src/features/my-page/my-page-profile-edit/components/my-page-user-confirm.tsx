"use client";
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
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { verifyPW } from "@/src/services/members.service";
import Image from "next/image";
import logo from "@/public/imgs/logo.png";
import { Button } from "@/src/components/ui/button";
import { PasswordInput } from "@/src/components/common/password-input";
import { userConfirmFormSchema } from "@/src/features/my-page/my-page-profile-edit/actions/user-confirm-schema";

type Props = {
  onConfirm: () => void;
};
export default function UserConfirm ({ onConfirm }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof userConfirmFormSchema>>({
    resolver: zodResolver(userConfirmFormSchema),
    defaultValues: {
      password: "",
    },
  });

  const error = form.formState.errors;
  useEffect(() => {
    if (error) {
      const arr = Object.values(error)[0];
      if (arr) toast(arr.message);
    }
  }, [error]);

  const onSubmit = async (values: z.infer<typeof userConfirmFormSchema>) => {
    try {
      if (!session) return toast("로그인 에러입니다.");
      setLoading(true);
      const { password } = values;
      const res = await verifyPW(session.user.memberId, password);
      const data = res.data;
      if (data.data) {
        toast("확인되었습니다.");
        onConfirm();
      } else {
        toast("잘못된 비밀번호입니다.");
      }
    } catch (err) {
      console.error(err);
      toast(err as string);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full ">
        <div className="flex flex-col ">
          <Image
            src={logo}
            alt="Signal Buddy 로고"
            width={206}
            height={38}
            className="dark:invert"
          />
          <p className="text-sm mt-4 theme-label">
            회원가입 시 등록한 비밀번호를 확인해주세요.
          </p>
        </div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs theme-label ">이메일</FormLabel>
              <FormControl>
                <PasswordInput field={field} hasBg />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-teal text-white text-sm h-10 mt-6 rounded-md"
          disabled={loading}
        >
          비밀번호 확인
        </Button>
      </form>
    </Form>
  );
}
