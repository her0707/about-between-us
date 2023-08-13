import { useState, useEffect } from "react";

const useGetCurrentPosition = () => {
  const [currentPosition, setCurrentPosition] = useState<GeoLocation>({
    lat: "37.715133",
    lng: "126.734086",
  });

  const getCurrentPosition = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition({
          lat: position.coords.latitude.toString(),
          lng: position.coords.longitude.toString(),
        });
      });
    }
  };

  useEffect(() => {
    getCurrentPosition();
  }, []);

  return {
    currentPosition,
  };
};

export default useGetCurrentPosition;
