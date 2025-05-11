// weather-info.tsx
import Image from "next/image";
import clsx from "clsx";
import { useWeatherStore } from "@/src/store/weather/useWeatherStore";
import { getPm10Status, getPm25Status } from "@/src/utils/weatherStatus";

const statusColors = {
  좋음: "text-blue",
  보통: "text-green",
  나쁨: "text-orange-500",
  "매우 나쁨": "text-red",
};

function getStatusColor(status: string) {
  return statusColors[status as keyof typeof statusColors] || "text-gray-500";
}

export default function WeatherInfo() {
  const { weatherData, airQualityData, weatherIcon } = useWeatherStore();

  const pm10Status = getPm10Status(Number(airQualityData?.pm10));
  const pm25Status = getPm25Status(Number(airQualityData?.pm25));

  return (
    <div className="bg-white w-full h-[140px] rounded-[8px] border border-gray-300 p-6">
      <div className="h-full mx-auto grid grid-cols-[4fr_2fr]">
        <div className="flex gap-3 items-center">
          {weatherIcon && (
            <Image
              src={weatherIcon}
              alt={`${weatherData?.precipitationType || "날씨"} 아이콘`}
              className="h-[90px] w-[90px]"
            />
          )}
          <div className="justify-center flex flex-col gap-1">
            <p className="font-extrabold text-4xl text-gray-900 leading-none">
              {weatherData?.temperature}°
            </p>
            <p className="text-sm font-bold text-gray-600 leading-none">
              {weatherData?.precipitationType === "없음"
                ? "맑음"
                : weatherData?.precipitationType}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center text-gray-500 text-sm font-bold gap-1">
          <div className="flex gap-1">
            <p>미세</p>
            <p className={clsx("font-bold", getStatusColor(pm10Status))}>
              {pm10Status}
            </p>
          </div>
          <div className="flex gap-1">
            <p>초미세</p>
            <p className={clsx("font-bold", getStatusColor(pm25Status))}>
              {pm25Status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
