/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import {
  CrossRoadStateType,
  CrossRoadType,
  TMap,
  TMapLatLng,
  TMapMarker,
} from "../types";
import { getCrossroadState } from "../services/crossroad.service";
import { toast } from "sonner";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function useMapCrossRoad(map: TMap | null) {
  const searchParams = useSearchParams();
  const crossroadId = searchParams.get("crossroadId");
  const ws = useRef<WebSocket | null>(null);
  const mapRef = useRef<TMap | null>(map);
  const [target, setTarget] = useState<
    (CrossRoadType & CrossRoadStateType) | null
  >(null);

  const [isLoading, setIsLoading] = useState(true);
  const [center, setCenter] = useState<TMapLatLng>(
    map
      ? map.getCenter()
      : { name: "skttop", _lat: 37.5652045, _lng: 126.98702028 },
  );

  const [refreshTrigger, setRefreshTrigger] = useState<boolean>(false);

  const [crossRoadMarkers, setCrossRoadMarkers] = useState<TMapMarker[]>([]);

  const removeTarget = () => {
    setTarget(null);
  };

  const getRadiusByZoom = (zoom: number): number => {
    if (zoom >= 19) return 400;
    if (zoom >= 18) return 800;
    if (zoom >= 17) return 1000;
    if (zoom >= 15) return 3000;
    if (zoom >= 13) return 5000;
    if (zoom >= 11) return 7000;
    return 10000;
  };

  const addTargetMarker = (cross: CrossRoadType) => {
    const { Tmapv2 } = window;
    const currentMap = mapRef.current;
    if (!Tmapv2 || !currentMap) return null;

    const marker = new Tmapv2.Marker({
      id: String(cross.crossroadId),
      position: new Tmapv2.LatLng(cross.lat, cross.lng),
      map: currentMap,
      title: cross.name,
      icon: "/imgs/cross-marker.png",
    });
    marker.addListener("click", async () => {
      handleClickItem(cross);
    });
    marker.addListener("touchend", async () => {
      handleClickItem(cross);
    });
    return marker;
  };

  const handleGetCrossroadState = async (crossroadId: number) => {
    const res = await getCrossroadState(crossroadId);
    const data = res.data;
    if (data.status === "성공" && data.data) {
      return data.data;
    } else if (data.code && data.message) {
      toast(data.message);
    }
    return null;
  };

  const handleClickItem = async (cross: CrossRoadType) => {
    try {
      const { Tmapv2 } = window;
      const currentMap = mapRef.current;
      if (!Tmapv2 || !currentMap) return null;
      if (target) setTarget(null);
      const data = await handleGetCrossroadState(cross.crossroadId);
      if (data) {
        setTarget({ ...cross, ...data });
      }
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        toast(err.response.data.message);
      }
    }
  };

  const refreshState = async (target: CrossRoadType & CrossRoadStateType) => {
    try {
      const data = await handleGetCrossroadState(target.crossroadId);
      if (data) {
        setTarget((prev) => ({ ...prev, ...data }));
        setRefreshTrigger((prev) => !prev);
      }
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        toast(err.response.data.message);
      }
    } finally {
      setTimeout(() => {
        setRefreshTrigger((prev) => !prev);
      }, 1000);
    }
  };

  const handleCrossroadState = async (id: number) => {
    try {
      const { Tmapv2 } = window;
      const currentMap = mapRef.current;
      if (!Tmapv2 || !currentMap) return null;
      if (target) setTarget(null);
      const data = await handleGetCrossroadState(id);
      if (data) {
        setTarget({ ...data });
      }
      currentMap.setZoom(19);
      setTimeout(() => {
        currentMap.setCenter(new Tmapv2.LatLng(data.lat, data.lng));
      }, 1000);
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        toast(err.response.data.message);
      }
    }
  };

  useEffect(() => {
    mapRef.current = map;
  }, [map]);

  useEffect(() => {
    ws.current = new WebSocket(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/ws/location`,
    );

    ws.current.onopen = () => {
      setIsLoading(false);
      if (!mapRef.current) return;

      const payload = JSON.stringify({
        lat: center._lat,
        lng: center._lng,
        radius: getRadiusByZoom(mapRef.current.getZoom()),
      });
      sendMessage(payload);
    };

    ws.current.onmessage = (event) => {
      const responseData = JSON.parse(event.data);
      const data = responseData.data;
      crossRoadMarkers.forEach((marker) => marker.setMap(null));

      const newMarkers = data
        .map((cross: CrossRoadType) => addTargetMarker(cross))
        .filter(
          (marker: TMapMarker | null): marker is TMapMarker => marker !== null,
        );

      setCrossRoadMarkers(newMarkers);
    };

    ws.current.onerror = () => console.log("WebSocket Error");
    ws.current.onclose = () => {
      console.log("Websocket connection is closed");
    };

    return () => {
      if (ws.current?.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, []);

  const sendMessage = (payload: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(payload);
    } else if (ws.current?.readyState === WebSocket.CONNECTING) {
      ws.current.addEventListener(
        "open",
        () => {
          ws.current?.send(payload);
        },
        { once: true },
      );
    } else {
      console.error("WebSocket is not open or connecting.");
    }
  };

  useEffect(() => {
    if (!mapRef.current) return;

    const zoom = mapRef.current.getZoom();
    const radius = getRadiusByZoom(zoom);

    const payload = JSON.stringify({
      lat: center._lat,
      lng: center._lng,
      radius,
    });

    sendMessage(payload);
  }, [center, map]);

  useEffect(() => {
    if (!map) return;

    const handleCenterChange = () => {
      setCenter(map.getCenter());
    };

    map.addListener("dragend", handleCenterChange);
    map.addListener("zoom_changed", handleCenterChange);

    return () => {
      map.removeListener("dragend", handleCenterChange);
      map.removeListener("zoom_changed", handleCenterChange);
    };
  }, [map]);

  useEffect(() => {
    if (!map || !crossroadId) return;
    const numCrossroadId = Number(crossroadId);
    if (!isNaN(numCrossroadId)) {
      handleCrossroadState(numCrossroadId);
    }
  }, [map, crossroadId]);

  return { isLoading, target, refreshTrigger, removeTarget, refreshState };
}
