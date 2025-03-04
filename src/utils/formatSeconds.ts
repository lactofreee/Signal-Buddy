import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export const formatSeconds = (seconds: number): string => {
  const dur = dayjs.duration(seconds, "seconds");

  const hours = dur.hours();
  const minutes = dur.minutes();
  const secs = dur.seconds();

  if (hours > 0) {
    return `${hours}시 ${String(minutes).padStart(2, "0")}분 ${String(secs).padStart(2, "0")}초`;
  } else if (minutes > 0) {
    return `${minutes}분 ${String(secs).padStart(2, "0")}초`;
  } else {
    return `${secs}초`;
  }
};
