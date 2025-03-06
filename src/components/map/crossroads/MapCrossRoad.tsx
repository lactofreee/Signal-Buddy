"use client";

import { CrossRoadStateType } from "@/src/types";

type Props = {
  target: CrossRoadStateType;
};

export default function MapCrossRoad({ target }: Props) {
  return (
    <div className="w-[calc(100%-32px)] flex flex-col">
      MapCrossRoad
      <div>
        북:{target.northState} {target.northTimeLeft}
      </div>
      <div>
        남:{target.southState} {target.southTimeLeft}
      </div>
      <div>
        동:{target.eastState} {target.eastTimeLeft}
      </div>
      <div>
        서:{target.westState} {target.westTimeLeft}
      </div>
      <div>
        북동:{target.northeastState} {target.northeastTimeLeft}
      </div>
      <div>
        북서:{target.northwestState} {target.northwestTimeLeft}
      </div>
      <div>
        남동:{target.southeastState} {target.southeastTimeLeft}
      </div>
      <div>
        남서:{target.southwestState} {target.southwestTimeLeft}
      </div>
    </div>
  );
}
