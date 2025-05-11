import { useState, useRef } from "react";
import {
  RouteFeature,
  TmapResponse,
  LineStringFeature,
  TMap,
  TMapPolyline,
  TMapMarker,
} from "../types";

type LatLng = { x: number; y: number; name: string };

export default function useMapDirection(map: TMap | null) {
  const [routeFeatures, setRouteFeatures] = useState<RouteFeature[]>([]);
  const polyLineRef = useRef<TMapPolyline>(null);
  const markers = useRef<{ [key: string]: TMapMarker | null }>({
    start: null,
    end: null,
  });

  const onComplete = (data: { _responseData: TmapResponse }) => {
    const { Tmapv2 } = window;
    if (!Tmapv2 || !map) return;
    if (!data._responseData.features || !data._responseData.features.length) {
      return alert("경로가 없습니다.");
    }
    if (polyLineRef.current) {
      polyLineRef.current.setMap(null);
    }
    const features = data._responseData.features;
    drawRoute(features);
    setRouteFeatures(features);
  };

  const drawRoute = (routeData: RouteFeature[]) => {
    const { Tmapv2 } = window;
    if (!Tmapv2 || !map) return;
    const path = routeData
      .filter(
        (item): item is LineStringFeature =>
          item.geometry.type === "LineString",
      )
      .flatMap((item) =>
        item.geometry.coordinates.map((coord) => {
          return new Tmapv2.LatLng(coord[1], coord[0]);
        }),
      );
    const Polyline = new Tmapv2.Polyline({
      path,
      strokeColor: "#0cd9bd",
      outline: true,
      strokeWeight: 6,
      map: map,
    });
    polyLineRef.current = Polyline;
    map.setCenter(path[Math.floor(path.length / 2)]);
    map.setZoom(14);
  };

  const addMarker = (latlon: LatLng, type: "start" | "end") => {
    const { Tmapv2 } = window;
    if (!Tmapv2 || !map) return;

    const marker = new Tmapv2.Marker({
      animation: Tmapv2.MarkerOptions.ANIMATE_BALLOON,
      position: new Tmapv2.LatLng(latlon.y, latlon.x),
      map: map,
      title: type.toUpperCase(),
      icon: `/imgs/${type}-marker.png`,
    });
    markers.current[type] = marker;
  };

  const getRoute = (start: LatLng | null, end: LatLng | null) => {
    const { Tmapv2 } = window;
    if (!Tmapv2 || !start || !end) return;
    if (markers.current.start) markers.current.start.setMap(null);
    if (markers.current.end) markers.current.end.setMap(null);
    const tData = new Tmapv2.extension.TData();
    const params = {
      onComplete,
      onProgress: () => console.log("진행중..."),
      onError: () => alert("Error: 그런 건 없을지도..?"),
    };

    tData.getRoutePlanForPeopleJson(
      new Tmapv2.LatLng(start.y, start.x),
      new Tmapv2.LatLng(end.y, end.x),
      start.name,
      end.name,
      {},
      params,
    );
    addMarker(start, "start");
    addMarker(end, "end");
  };

  return { routeFeatures, getRoute };
}
