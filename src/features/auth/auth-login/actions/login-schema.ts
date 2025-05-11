import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "아이디를 입력해주세요." })
    .email({ message: "이메일 형식이 아닙니다." }),
  password: z
    .string()
    .min(8, { message: "비밀번호를 최소 8자 이상 입력해주세요." })
    .max(50, { message: "최대 50자까지 입력 가능합니다." }),
  agree: z.array(z.string()),
});
