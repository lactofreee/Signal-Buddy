import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TMapMarker, TMapEvent, TMap } from "@/src/types";
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import { useRef, useEffect, useState } from "react";

type Props = {
  map: TMap | null;
  getGEO: () => void;
};

export default function MapButtons({ map, getGEO }: Props) {
  const clickMarkerRef = useRef<TMapMarker>(null);

  const handleClickCurrentPosition = () => {
    getGEO();
  };

  const removeClickMarker = () => {
    if (clickMarkerRef.current) {
      clickMarkerRef.current.setMap(null);
    }
    clickMarkerRef.current = null;
  };

  const onClick = (e: TMapEvent) => {
    removeClickMarker();
    const { Tmapv2 } = window;
    if (!Tmapv2 || !map) return;

    const lonlat = e.latLng;

    const marker = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(lonlat._lat, lonlat._lng),
      icon: "/imgs/click-marker.png",
      map,
    });
    clickMarkerRef.current = marker;
  };

  useEffect(() => {
    if (map) {
      map.addListener("click", onClick);
    }
  }, [map]);

  const [mapType, setMapType] = useState<number>(map?._data.mapType || 1);
  const TMAP_TYPE = {
    ROAD: 1,
    SATELLITE: 4,
    HYBRID: 5,
  } as { [key: string]: number };

  const handleChangeMapType = (type: "SATELLITE" | "HYBRID" | "ROAD") => {
    const { Tmapv2 } = window;
    if (!Tmapv2 || !map) return;
    if (!map) return;
    if ("SATELLITE" == type) {
      map.setMapType(Tmapv2.Map.MapType.SATELLITE);
    } else if ("HYBRID" == type) {
      map.setMapType(Tmapv2.Map.MapType.HYBRID);
    } else if ("ROAD" == type) {
      map.setMapType(Tmapv2.Map.MapType.ROAD);
    }
    setMapType(TMAP_TYPE[type]);
  };

  const buttonStyle = (type: string) => {
    if (!map)
      return "bg-white border border-gray-300 max-w-none whitespace-nowrap";
    return cn(
      "bg-white border border-gray-300 max-w-none whitespace-nowrap",
      mapType === TMAP_TYPE[type] && "bg-black text-white",
    );
  };

  return (
    <>
      <div className="fixed top-[140px] md:top-20 left-4 md:left-[340px] flex gap-2 z-[99]">
        <Button
          className={buttonStyle("ROAD")}
          onClick={() => handleChangeMapType("ROAD")}
        >
          일반지도
        </Button>
        <Button
          className={buttonStyle("SATELLITE")}
          onClick={() => handleChangeMapType("SATELLITE")}
        >
          위성지도
        </Button>
        <Button
          className={buttonStyle("HYBRID")}
          onClick={() => handleChangeMapType("HYBRID")}
        >
          일반+위성지도
        </Button>
      </div>

      <button
        onClick={handleClickCurrentPosition}
        className="fixed bottom-10 left-4 md:left-[340px]  border rounded-full hover:bg-gray-200 border-gray-300 z-[99] bg-gray-100 p-1"
      >
        <ArrowDownCircleIcon className="w-6 h-6 text-teal" />
      </button>
    </>
  );
}
