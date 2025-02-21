import { useState, useEffect } from "react";

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

  return { location, error, handleGetGeo };
};
