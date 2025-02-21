"use client";

import { useGeoLocation } from "@/src/hooks/useGeoLocation";
import { useRef, useState } from "react";
import useMap from "@/src/hooks/useMap";
import MapSearch from "./MapSearch";
import MapButtons from "./MapButtons";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Minus, Plus } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];
const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

export default function MapBox() {
  const mapRef = useRef<HTMLDivElement>(null);

  const { location, handleGetGeo } = useGeoLocation(geolocationOptions);
  const { mapIns } = useMap(mapRef, location);

  const [goal, setGoal] = useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  return (
    <div className="flex relative flex-grow max-w-[100vw] max-h-[calc(100vh-70px)] overflow-hidden">
      <div className="w-full md:w-[40%] md:max-w-[320px] md:h-[calc(100vh-70px)] bg-gray-100 py-2 shadow-md absolute top-0 left-0 z-[999] flex flex-col items-center">
        <MapSearch map={mapIns} location={location} />
      </div>
      <MapButtons map={mapIns} getGEO={handleGetGeo} />
      <div className="flex-1 relative">
        <div id="map" ref={mapRef} />
      </div>
    </div>
  );
}
