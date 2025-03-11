import { useEffect, useRef, useState } from "react";
import { MapOptions, TMap, TMapMarker } from "@/src/types";
import { ILocation } from "./useGeoLocation";
import { DEFAULT_ZOOM_LEVEL } from "@/src/constants";

export default function useMap(
  mapRef: React.RefObject<HTMLDivElement | null>,
  location?: ILocation,
  options: MapOptions = {
    width: "100%",
    height: "calc(100vh - 70px)",
    zoom: DEFAULT_ZOOM_LEVEL,
    zoomControl: false,
    scrollwheel: true,
  },
) {
  const [mapIns, setMapIns] = useState<TMap | null>(null);
  const [currentMarker, setCurrentMarker] = useState<TMapMarker | null>(null);
  const isFirstLocationSet = useRef(false);

  const initTmap = () => {
    const { Tmapv2 } = window;
    if (!Tmapv2) return;

    const mapDiv = mapRef.current;
    if (!mapDiv) return;
    if (!mapDiv.firstChild) {
      const latitude = 37.5652045;
      const longitude = 126.98702028;

      const position = new Tmapv2.LatLng(latitude, longitude);

      const map = new Tmapv2.Map("map", {
        center: position,
        httpsMode: true,
        pinchZoom: true,
        scaleBar: false,
        ...options,
      });

      const marker = new Tmapv2.Marker({
        name: "currentTarget",
        position,
        map,
        icon: "/imgs/current-marker.png",
        iconSize: new Tmapv2.Size(50, 50),
      });

      setCurrentMarker(marker);
      setMapIns(map);
    }
  };

  const handleCurrentMarkerPosition = () => {
    if (currentMarker) {
      const { Tmapv2 } = window;
      if (!Tmapv2 || !location) return;
      const latitude = location?.latitude || 37.5652045;
      const longitude = location?.longitude || 126.98702028;
      const position = new Tmapv2.LatLng(latitude, longitude);
      setTimeout(() => {
        currentMarker.setPosition(position);
      }, 0);
    }
  };

  const handleGetCenter = () => {
    if (location && mapIns) {
      const { Tmapv2 } = window;
      if (!Tmapv2) return;
      const latitude = location?.latitude || 37.5652045;
      const longitude = location?.longitude || 126.98702028;

      const position = new Tmapv2.LatLng(latitude, longitude);
      mapIns.setCenter(position);
      mapIns.setZoom(19);
      if (currentMarker) {
        setTimeout(() => {
          currentMarker.setPosition(position);
        }, 0);
      }
    }
  };
  useEffect(() => {
    initTmap();
  }, []);

  useEffect(() => {
    if (location && mapIns && !isFirstLocationSet.current) {
      handleGetCenter();
      isFirstLocationSet.current = true;
    }
    handleCurrentMarkerPosition();
  }, [location, mapIns]);

  return {
    mapIns,
    handleGetCenter,
  };
}
