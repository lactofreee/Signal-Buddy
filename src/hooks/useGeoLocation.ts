import { useState, useEffect } from "react";
import { toast } from "sonner";

export interface ILocation {
  latitude: number;
  longitude: number;
}

export const useGeoLocation = (options = {}) => {
  const [location, setLocation] = useState<ILocation>();
  const [trigger, setTrigger] = useState<boolean>(false);
  const [error, setError] = useState("");

  const handleGetGeo = () => {
    setTrigger((prev) => !prev);
  };

  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;
    setLocation({
      latitude,
      longitude,
    });
  };

  const handleError = (err: GeolocationPositionError) => {
    setError(err.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;
    if (!geolocation) {
      setError("Geolocation is not supported.");
      return;
    }
    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, [options, trigger]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation을 지원하지 않는 브라우저입니다.");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast("사용자가 위치 정보 제공을 거부했습니다.");
            break;
          case error.POSITION_UNAVAILABLE:
            toast("위치 정보를 가져올 수 없습니다.");
            break;
          case error.TIMEOUT:
            toast("위치 정보를 가져오는 요청이 시간 초과되었습니다.");
            break;
          default:
            toast("알 수 없는 오류가 발생했습니다.");
        }
      },
      {
        enableHighAccuracy: true, // 배터리 소모가 크지만 더 정확한 위치 정보 제공
        timeout: 5000, // 10초 내에 위치 정보 가져오기
        maximumAge: 10000, // 캐시된 위치 정보 10초
      },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { location, error, handleGetGeo };
};
