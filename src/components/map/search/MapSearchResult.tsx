import { Button } from "@/components/ui/button";
import { saveRecentPath } from "@/src/services/members.service";
import { PoiDetail } from "@/src/types";
import {
  BuildingOffice2Icon,
  BuildingOfficeIcon,
  ClockIcon,
  HomeIcon,
  MapPinIcon,
  PhoneIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import Link from "next/link";
type Props = {
  target: PoiDetail;
  onClose: () => void;
  onClick: (target: PoiDetail) => void;
};

export default function MapSearchResult({ target, onClose, onClick }: Props) {
  const { data: session } = useSession();
  const handleClick = async (poi: PoiDetail) => {
    onClick(poi);
    try {
      if (!session) return;
      await saveRecentPath(session.user.memberId, {
        name: poi.name,
        address: poi.address || "알수없음",
        lat: Number(poi.frontLat),
        lng: Number(poi.frontLon),
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex flex-col py-2 max-h-[calc(100vh-126px)]">
      <div className="flex-grow flex flex-col gap-2 overflow-y-auto">
        <div className="flex flex-col gap-4 theme-content-bg px-2 py-3 md:py-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex gap-1 text-sm font-semibold theme-label">
              {target.detailBizName || "기타"}
            </div>
            <Button onClick={onClose} size={"icon"} variant={"ghost"}>
              <XMarkIcon className="!size-5" />
            </Button>
          </div>
          <div className="font-bold text-2xl">{target.name}</div>

          <div className="flex">
            <Button
              onClick={() => handleClick(target)}
              className="w-full flex items-center text-lg bg-teal text-white hover:opacity-80"
            >
              <MapPinIcon className="size-7" /> 도착지 설정
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 theme-content-bg px-2 py-3 md:py-4 rounded-xl text-sm font-semibold theme-map-content-text">
          {target.desc && (
            <div className="font-semibold text-sm text-gray-700">
              {target.desc}
            </div>
          )}
          {target.additionalInfo && (
            <div className="whitespace-pre flex gap-4 items-center">
              <div>
                <ClockIcon className="size-4 min-w-4" />
              </div>
              {target.additionalInfo.replaceAll(";", "\n")}
            </div>
          )}
          {target.address && (
            <div className="flex gap-4 items-center">
              <div>
                <BuildingOffice2Icon className="size-4 min-w-4" />
              </div>
              {target.address} {target.firstNo ? target.firstNo : ""}
              {target.secondNo ? `-${target.secondNo}` : ""}
            </div>
          )}
          {target.bldAddr && (
            <div className="flex gap-4 items-center">
              <div>
                <BuildingOfficeIcon className="size-4 min-w-4" />
              </div>
              {target.bldAddr} {target.bldNo1 ? target.bldNo1 : ""}{" "}
              {target.bldNo2 ? target.bldNo2 : ""}
            </div>
          )}
          {target.tel && (
            <div className="flex gap-4 items-center">
              <PhoneIcon className="size-4 min-w-4" />
              {target.tel}
            </div>
          )}
          {target.homepageURL && (
            <div className="flex gap-4 items-center break-all">
              <HomeIcon className="size-4 min-w-4" />
              <Link
                href={target.homepageURL}
                target="_blank"
                className="hover:underline"
              >
                {target.homepageURL}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
