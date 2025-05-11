import { z } from "zod";

export const userConfirmFormSchema = z.object({
  password: z
    .string()
    .min(8, { message: "비밀번호를 최소 8자 이상 입력해주세요." })
    .max(50, { message: "최대 50자까지 입력 가능합니다." }),
});
