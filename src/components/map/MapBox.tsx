"use client";

import { useGeoLocation } from "@/src/hooks/useGeoLocation";
import { useRef } from "react";
import useMap from "@/src/hooks/useMap";
import MapSearch from "./search/MapSearch";
import MapButtons from "./MapButtons";
import MapDirection from "./direction/MapDirection";
import useMapCrossRoad from "@/src/hooks/useMapCrossRoad";
import MapCrossRoad from "./crossroads/MapCrossRoad";

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

type Props = {
  slug?: string[];
};

export default function MapBox({ slug }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  const { location, handleGetGeo } = useGeoLocation(geolocationOptions);
  const { mapIns } = useMap(mapRef, location);
  const { target: crossTarget } = useMapCrossRoad(mapIns);

  return (
    <div className="flex relative flex-grow max-w-[100vw] max-h-[calc(100vh-70px)] overflow-hidden">
      <div className="w-full md:w-[40%] md:max-w-[320px] md:h-[calc(100vh-70px)] bg-gray-100 pb-2 md:py-2 shadow-md absolute top-0 left-0 z-[999] flex flex-col items-center theme-bg">
        {crossTarget ? (
          <MapCrossRoad target={crossTarget} />
        ) : !slug ? (
          <MapSearch map={mapIns} location={location} />
        ) : slug[0] === "direction" ? (
          <MapDirection map={mapIns} location={location} />
        ) : (
          <></>
        )}
      </div>
      <MapButtons map={mapIns} getGEO={handleGetGeo} />
      <div className="flex-1 relative cursor-grab">
        <div id="map" ref={mapRef} />
      </div>
    </div>
  );
}
