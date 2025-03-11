"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CrossRoadStateType, CrossRoadType } from "@/src/types";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import MapCrossRoadState from "./MapCrossRoadState";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import MapCrossroadFeedback from "./MapCrossroadFeedback";

type Props = {
  target: CrossRoadType & CrossRoadStateType;
  removeTarget: () => void;
  refreshState: (target: CrossRoadType & CrossRoadStateType) => void;
};

export default function MapCrossRoad({
  target,
  removeTarget,
  refreshState,
}: Props) {
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div
      className={cn(
        "w-full flex flex-col h-[calc(100vh-70px)] max-h-[calc(100vh-70px)]  transition-all md:translate-y-0 rounded-t-lg md:rounded-none items-center fixed left-0 md:relative theme-bg md:top-auto md:left-auto py-2 z-[9999999]",
        open ? "top-[70px] translate-y-0" : "top-full -translate-y-[260px]",
      )}
    >
      <button
        onClick={toggleOpen}
        className={cn(
          "border theme-bg theme-login-border px-4 top-0 left-1/2 -translate-x-1/2 absolute flex md:hidden",
          !open
            ? "-translate-y-full rounded-t-xl"
            : "translate-y-0 rounded-b-xl",
        )}
      >
        {open ? <ChevronDownIcon /> : <ChevronUpIcon />}
      </button>
      <div className="w-[calc(100%-32px)] flex flex-col items-center">
        <div className="w-full flex items-center gap-4 justify-between mb-2">
          <div className="text-xl font-bold">{target.name}</div>
          <Button
            onClick={removeTarget}
            type="button"
            variant={"ghost"}
            size={"icon"}
          >
            <XMarkIcon className="!size-5" />
          </Button>
        </div>
        <div className="w-full flex items-center justify-center bg-white dark:bg-black rounded-md border border-gray-300 dark:border-gray-700 p-2 mb-4">
          <div className="relative w-[180px] aspect-square flex items-center justify-center ">
            <Image
              src={"/imgs/all-direction.svg"}
              alt="all direction"
              width={70}
              height={70}
            />
            <MapCrossRoadState
              state={target.northState}
              position="north"
              leftTime={target.northTimeLeft}
              refresh={() => refreshState(target)}
            />
            <MapCrossRoadState
              state={target.southState}
              position="south"
              leftTime={target.southTimeLeft}
              refresh={() => refreshState(target)}
            />
            <MapCrossRoadState
              state={target.eastState}
              position="east"
              leftTime={target.eastTimeLeft}
              refresh={() => refreshState(target)}
            />
            <MapCrossRoadState
              state={target.westState}
              position="west"
              leftTime={target.westTimeLeft}
              refresh={() => refreshState(target)}
            />
            <MapCrossRoadState
              state={target.northeastState}
              position="northeast"
              leftTime={target.northeastTimeLeft}
              refresh={() => refreshState(target)}
            />
            <MapCrossRoadState
              state={target.northwestState}
              position="northwest"
              leftTime={target.northwestTimeLeft}
              refresh={() => refreshState(target)}
            />
            <MapCrossRoadState
              state={target.southeastState}
              position="southeast"
              leftTime={target.southeastTimeLeft}
              refresh={() => refreshState(target)}
            />
            <MapCrossRoadState
              state={target.southwestState}
              position="southwest"
              leftTime={target.southwestTimeLeft}
              refresh={() => refreshState(target)}
            />
          </div>
        </div>
        <div className="w-full flex items-center gap-4 justify-between mb-2">
          <div className="text-lg font-bold">피드백</div>
          {session && (
            <Button type="button" asChild>
              <Link href={`/feedback/write?crossroadId=${target.crossroadId}`}>
                <PencilSquareIcon className="!size-5" /> 피드백 작성
              </Link>
            </Button>
          )}
        </div>
        <div className="w-full max-h-[calc(100vh-396px)]">
          <div className="flex-grow flex flex-col gap-2 overflow-y-auto">
            <MapCrossroadFeedback crossroadId={target.crossroadId} />
          </div>
        </div>
      </div>
    </div>
  );
}
