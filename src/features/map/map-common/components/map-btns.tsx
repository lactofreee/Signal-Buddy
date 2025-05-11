import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/utils";
import { TMap } from "@/src/types";
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import MapWeather from "../../map-weather/components/map-weather";
import MapWeatherMobileDrawer from "../../map-weather/components/map-weather-mobile-drawer";

type Props = {
  map: TMap | null;
  getGEO: () => void;
  setCenterLocation: () => void;
};

export default function MapButtons({ map, getGEO, setCenterLocation }: Props) {
  const handleClickCurrentPosition = () => {
    getGEO();
    setCenterLocation();
  };

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
      "bg-white border border-gray-300 max-w-none whitespace-nowrap text-black hover:text-white",
      mapType === TMAP_TYPE[type] && "bg-black text-white",
    );
  };

  return (
    <>
      <div className="fixed top-[140px] md:top-20 left-4 md:left-[340px] hidden md:flex gap-2 z-[99]">
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

      {/* <MapWeather />
      

      <button
        onClick={handleClickCurrentPosition}
        className="fixed bottom-14 md:bottom-10 left-4 md:left-[340px]  border rounded-full hover:bg-gray-200 border-gray-300 z-[99] bg-gray-100 p-1"
      >
        <ArrowDownCircleIcon className="w-8 h-8 text-teal" />
      </button> */}

      <div className="fixed bottom-14 md:bottom-10 left-4 md:left-[340px] z-[99]">
        <div className="flex flex-col gap-1">
          <MapWeatherMobileDrawer />
          <button
            onClick={handleClickCurrentPosition}
            className="border rounded-full hover:bg-gray-200 border-gray-300 bg-gray-100 p-1"
          >
            <ArrowDownCircleIcon className="w-8 h-8 text-teal" />
          </button>
        </div>
      </div>
    </>
  );
}
