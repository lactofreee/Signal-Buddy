// MapWeatherMobileDrawer.tsx
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/src/components/ui/drawer";
import React, { useEffect, useRef, useState } from "react";
import MapWeather from "./map-weather";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { getAirQuality } from "../actions/get-air-quality";
import { useWeatherStore } from "@/src/store/weather/useWeatherStore";
import WeatherInfo from "./map-weather-info";

export default function MapWeatherMobileDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { setAirQualityData } = useWeatherStore();
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (isOpen) titleRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const fetchAir = async () => {
      const airData = await getAirQuality();
      setAirQualityData(airData.data);
    };
    fetchAir();
  }, [setAirQualityData]);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <MapWeather onClick={(e) => e.currentTarget.blur()} />
      </DrawerTrigger>
      <DrawerContent className="z-[1000] bg-gray-100 mb-2 md:ml-[320px]">
        <DrawerHeader className="gap-0 pt-3">
          <div className="flex justify-center items-center w-full relative mb-[18px] ">
            <DrawerTitle
              className="font-bold text-xl text-black"
              ref={titleRef}
            />
            <DrawerClose asChild>
              <XMarkIcon className="!w-7 !h-7 text-gray-600 cursor-pointer absolute right-0" />
            </DrawerClose>
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <WeatherInfo />
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
