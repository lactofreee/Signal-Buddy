import { z } from "zod";

export const joinFormSchema = z
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
