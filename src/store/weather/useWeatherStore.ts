// stores/useWeatherStore.ts
import { StaticImageData } from "next/image";
import { create } from "zustand";

interface IAirQuality {
  grade: string;
  pm10: string;
  pm25: string;
}

interface IWeatherData {
  temperature: number;
  humidity: number;
  precipitation: number;
  precipitationType: string;
  windDirection: number;
  windSpeed: number;
}

interface WeatherState {
  weatherData: IWeatherData | null;
  airQualityData: IAirQuality | null;
  weatherIcon: StaticImageData | null;

  setWeatherData: (data: IWeatherData) => void;
  setAirQualityData: (data: IAirQuality) => void;
  setWeatherIcon: (icon: StaticImageData | null) => void;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  weatherData: null,
  airQualityData: null,
  weatherIcon: null,

  setWeatherData: (data) => set({ weatherData: data }),
  setAirQualityData: (data) => set({ airQualityData: data }),
  setWeatherIcon: (icon) => set({ weatherIcon: icon }),
}));
