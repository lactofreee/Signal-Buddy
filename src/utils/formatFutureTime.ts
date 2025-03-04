import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/ko"; // 한국어 설정

dayjs.extend(advancedFormat);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);
dayjs.locale("ko"); // 한국어 적용

export const formatFutureTime = (seconds: number): string => {
  const futureTime = dayjs().add(seconds, "seconds");
  return futureTime.format("A hh:mm");
};
