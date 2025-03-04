import {
  TMAP_POINT_TYPE,
  TMAP_FACILITY_TYPE,
  TMAP_TURN_TYPE,
} from "@/src/constants";
import { RouteFeature } from "@/src/types";
import { formatDistance } from "@/src/utils";
import Image from "next/image";

type Props = {
  feature: RouteFeature;
  onClick: () => void;
};

export default function MapDirectionItem({ feature, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-2 flex gap-4 items-center cursor-pointer h-full transiton-all hover:opacity-70 rounded-md"
    >
      {"turnType" in feature.properties && (
        <div className="min-w-14 min-h-14  rounded flex items-center justify-center">
          <Image
            src={
              (TMAP_TURN_TYPE[feature.properties.turnType].icon as string) ||
              "/imgs/nav-walk.svg"
            }
            alt="nav icon"
            width={40}
            height={40}
          />
        </div>
      )}
      <div className="flex flex-col gap-2">
        {"pointType" in feature.properties && (
          <div className="text-sm font-semibold">
            {TMAP_POINT_TYPE[feature.properties.pointType]}
          </div>
        )}
        {"facilityType" in feature.properties && (
          <div className="text-xs font-semibold">
            {TMAP_FACILITY_TYPE[feature.properties.facilityType]}
          </div>
        )}
        {"turnType" in feature.properties && (
          <div className="text-lg font-semibold">
            {TMAP_TURN_TYPE[feature.properties.turnType].value}
          </div>
        )}
        {"distance" in feature.properties && (
          <div className="text-xs font-medium">
            {formatDistance(feature.properties.distance)} 이동
          </div>
        )}
      </div>
    </div>
  );
}
