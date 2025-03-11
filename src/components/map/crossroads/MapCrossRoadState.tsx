import { cn } from "@/lib/utils";
import { CrossRoadSignType, CrossRoadStatePosition } from "@/src/types";
import { useEffect, useState } from "react";

type Props = {
  state: CrossRoadSignType;
  position: CrossRoadStatePosition;
  leftTime: number | null;
  refresh: () => void;
};
const STATE_DEFAULT_STYLE =
  "w-10 h-10 rounded-full border absolute flex items-center justify-center text-sm font-bold text-white";
const STATE_COLOR = {
  RED: "bg-red",
  GREEN: "bg-green",
  YELLOW: "bg-yellow",
};
const STATE_POSITION = {
  north: "top-0 left-1/2 -translate-x-1/2",
  south: "bottom-0 left-1/2 -translate-x-1/2",
  east: "top-1/2 -translate-y-1/2 right-0",
  west: "top-1/2 -translate-y-1/2 left-0",
  northeast: "top-[10%] right-[10%]",
  northwest: "top-[10%] left-[10%]",
  southeast: "bottom-[10%] right-[10%]",
  southwest: "bottom-[10%] left-[10%]",
};

export default function MapCrossRoadState({
  state,
  position,
  leftTime,
  refresh,
}: Props) {
  const [time, setTime] = useState<number | null>(
    leftTime ? Math.floor((leftTime * 10) / 100) + 1 : null,
  );
  useEffect(() => {
    if (time === null) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    if (time === 0) {
      refresh();
    }
    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    if (leftTime) {
      setTime(Math.floor((leftTime * 10) / 100) + 1);
    } else setTime(null);
  }, [leftTime]);

  return (
    <div
      className={cn(
        STATE_DEFAULT_STYLE,
        STATE_POSITION[position],
        state && STATE_COLOR[state],
      )}
    >
      {time}
    </div>
  );
}
