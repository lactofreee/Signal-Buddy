import { cn } from "@/src/utils";
import { CrossRoadSignType, CrossRoadStatePosition } from "@/src/types";
import { useEffect, useState } from "react";

type Props = {
  state: CrossRoadSignType;
  position: CrossRoadStatePosition;
  leftTime: number | null;
  refresh: () => void;
  transTimestamp: number;
  refreshTrigger: boolean;
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

function getLeftTime(left: number, timeStamp: number) {
  const currentTime = Date.now();
  const elapsed = currentTime - timeStamp;

  const initialRemainingMs = left * 100;
  const remainingMs = initialRemainingMs - elapsed;

  return Math.floor(Math.max(remainingMs, 0) / 1000) + 2;
}

export default function MapCrossRoadState({
  state,
  position,
  leftTime,
  refresh,
  transTimestamp,
  refreshTrigger,
}: Props) {
  const [time, setTime] = useState<number | null>(
    leftTime ? getLeftTime(leftTime, transTimestamp) : null,
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
      setTimeout(() => {
        refresh();
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    if (!leftTime) return setTime(null);
    setTime(getLeftTime(leftTime, transTimestamp));
  }, [leftTime, refreshTrigger]);

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
