import { z } from "zod";

export function newPlaceNameSchema(currentName: string) {
  return z.object({
    placeName: z
      .string()
      .min(1, { message: "새로운 장소명을 입력해주세요." })
      .max(20, { message: "20자 이내로 입력해주세요" })
      .refine((value) => value !== currentName, {
        message: "새로운 장소명을 입력해주세요.",
      }),
  });
}
