"use client";

import { useGeoLocation } from "@/src/hooks/useGeoLocation";
import { useEffect, useRef } from "react";
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import useMap from "@/src/hooks/useMap";
import { TMapEvent, TMapMarker } from "@/src/types";
import MapSearch from "./MapSearch";

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

export default function MapBox() {
  const clickMarkerRef = useRef<TMapMarker>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const { location, handleGetGeo } = useGeoLocation(geolocationOptions);
  const { mapIns } = useMap(mapRef, location);

  const handleClickCurrentPosition = () => {
    handleGetGeo();
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
    if (!Tmapv2 || !mapIns) return;

    const lonlat = e.latLng;

    const marker = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(lonlat._lat, lonlat._lng),
      map: mapIns,
    });
    clickMarkerRef.current = marker;
  };

  useEffect(() => {
    if (mapIns) {
      mapIns.addListener("click", onClick);
    }
  }, [mapIns]);

  return (
    <div className="flex relative">
      <div className="w-[400px] h-[calc(100vh-70px)] bg-gray-100 py-2 px-4 shadow-md absolute top-0 left-0 z-[999] flex flex-col">
        <MapSearch map={mapIns} />
        <button
          onClick={handleClickCurrentPosition}
          className="absolute bottom-10 -right-10 border rounded-full hover:bg-gray-200 border-gray-300 z-999 bg-gray-100 p-1"
        >
          <ArrowDownCircleIcon className="w-6 h-6 text-teal" />
        </button>
      </div>
      <div className="flex-1 relative">
        <div id="map" ref={mapRef} />
      </div>
    </div>
  );
}
