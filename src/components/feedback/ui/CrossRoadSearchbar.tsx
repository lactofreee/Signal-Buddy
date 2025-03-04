import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";

export function CrossRoadSearchbar({
  addCrossRoad,
  crossroadId,
}: {
  addCrossRoad: Dispatch<SetStateAction<number>>;
  crossroadId: number;
}) {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="crossRoad" className="text-sm font-medium text-gray-500">
        피드백 위치
      </Label>
      <Input
        type="text"
        className="h-12 rounded-[4px] p-4 border border-gray-300 bg-white shadow-none text-gray-500 font-medium placeholder:text-gray-400"
        placeholder="위치를 입력해주세요."
        id="crossRoad"
        onChange={(e) => addCrossRoad(Number(e.target.value))}
        value={crossroadId}
      />
    </div>
  );
}
