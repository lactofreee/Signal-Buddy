import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";

// 없음
import sunny from "@/public/imgs/icons/weather/weather-sun.png";

// 비/눈
// 비
// 빗방울
import rain from "@/public/imgs/icons/weather/weather-rainy-3.png";

// 빗방울눈날림
import snowrain from "@/public/imgs/icons/weather/weather-snowy-1.png";

// 눈
// 눈날림
import snowy from "@/public/imgs/icons/weather/weather-snowy-2.png";

import { getAirQuality } from "../actions/get-air-quality";
import clsx from "clsx";
import { getWeatherInfo } from "../actions/get-weather-info";
import { getUserLocation } from "../actions/get-user-location";
import { useWeatherStore } from "@/src/store/weather/useWeatherStore";

type MapWeatherProps = React.HTMLAttributes<HTMLDivElement>;

interface IWeatherData {
  temperature: number;
  humidity: number;
  precipitation: number;
  precipitationType: string;
  windDirection: number;
  windSpeed: number;
}

export default function MapWeather(props: MapWeatherProps) {
  const {
    weatherData,
    airQualityData,
    weatherIcon,
    setWeatherData,
    setAirQualityData,
    setWeatherIcon,
  } = useWeatherStore();

  const statusColors = {
    좋음: "text-blue",
    보통: "text-green",
    나쁨: "text-orange-500",
    "매우 나쁨": "text-red",
  };

  const weatherIconConverter = (precipitationType: string) => {
    if (precipitationType === "없음") {
      setWeatherIcon(sunny);
      return;
    } else if (
      precipitationType === "비/눈" ||
      precipitationType === "비" ||
      precipitationType === "빗방울"
    ) {
      setWeatherIcon(rain);
      return;
    } else if (precipitationType === "빗방울눈날림") {
      setWeatherIcon(snowrain);
      return;
    } else {
      setWeatherIcon(snowy);
      return;
    }
  };

  useEffect(() => {
    const fetchLocationAndWeather = async () => {
      try {
        const location = await getUserLocation();
        if (location) {
          const { latitude, longitude } = location;
          console.log("위도:", latitude, "경도:", longitude);

          // EventSource 구독 시작
          const eventSource = getWeatherInfo(latitude, longitude);

          // 메시지 이벤트 리스너 등록
          eventSource.addEventListener(
            "WEATHER_UPDATE",
            (event: MessageEvent) => {
              console.log("[이벤트 수신] RAW event.data:", event.data);
              try {
                const parsedData: IWeatherData = JSON.parse(event.data);
                setWeatherData(parsedData);
                console.log("[파싱 성공] parsedData:", parsedData);
                weatherIconConverter(parsedData.precipitationType); // 수정된 부분
              } catch (err) {
                console.error("[파싱 실패] event.data:", event.data);
              }
            },
          );

          // 에러 처리
          eventSource.onerror = (error) => {
            console.error("EventSource 오류:", error);
            eventSource.close(); // 필요 시 연결 종료
          };
        }
      } catch (error) {
        console.error("위치 정보를 불러오는 중 오류 발생:", error);
      }
    };

    const fetchAirQuality = async () => {
      const airData = await getAirQuality();
      setAirQualityData(airData.data);
    };

    fetchLocationAndWeather();
    fetchAirQuality();
    return () => {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="날씨 정보 열기"
      className="border rounded-full hover:bg-gray-200 border-gray-300 z-[99] bg-gray-100 p-2 cursor-pointer"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.currentTarget.click();
        }
      }}
      {...props}
    >
      <div className="flex justify-center flex-col">
        <Image
          src={weatherIcon || sunny} // weatherIcon이 null일 경우 sunny로 기본값 설정
          alt="날씨 아이콘"
          className="h-6 w-6 mb-1"
        />

        <p className="text-black text-center leading-none">
          {weatherData?.temperature}
        </p>
        <div className="w-full h-1 bg-blue-500 rounded-full my-1"></div>
        <p
          className={clsx(
            "text-black text-center text-xs font-bold",
            statusColors[airQualityData?.grade as keyof typeof statusColors] ||
              "text-gray-500",
          )}
        >
          {airQualityData?.grade}
        </p>
      </div>
    </div>
  );
}
