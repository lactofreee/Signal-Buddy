import { z } from "zod";

export const resetPwEamilFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "아이디를 입력해주세요." })
    .email({ message: "이메일 형식이 아닙니다." }),
});

export const otpSchema = z.object({
  otp: z.string().length(6, { message: "6자리 인증번호를 입력해주세요." }),
});

export const resetPwFormSchema = z
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
