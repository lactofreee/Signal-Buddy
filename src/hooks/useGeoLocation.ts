import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";

export interface ILocation {
  latitude: number;
  longitude: number;
}

export const useGeoLocation = (options = {}) => {
  const [location, setLocation] = useState<ILocation>();
  const [error, setError] = useState("");
  const watchIdRef = useRef<number | null>(null);

  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;
    setLocation({
      latitude,
      longitude,
    });
  };

  const handleError = (err: GeolocationPositionError) => {
    setError(err.message);
    switch (err.code) {
      case err.PERMISSION_DENIED:
        toast("사용자가 위치 정보 제공을 거부했습니다.");
        break;
      case err.POSITION_UNAVAILABLE:
        toast("위치 정보를 가져올 수 없습니다.");
        break;
      case err.TIMEOUT:
        toast("위치 정보를 가져오는 요청이 시간 초과되었습니다.");
        break;
      default:
        toast("알 수 없는 오류가 발생했습니다.");
    }
  };
  const startWatching = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation을 지원하지 않는 브라우저입니다.");
      return;
    }

    if (watchIdRef.current === null) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        handleSuccess,
        handleError,
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 10000,
          ...options,
        },
      );
    }
  }, [options]);

  const stopWatching = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopWatching();
  }, [stopWatching]);

  const handleGetGeo = () => {
    if (!navigator.geolocation) {
      setError("Geolocation을 지원하지 않는 브라우저입니다.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options,
    );
  };

  return {
    location,
    error,
    startWatching,
    stopWatching,
    handleGetGeo,
    isWatching: watchIdRef.current !== null,
  };
};
