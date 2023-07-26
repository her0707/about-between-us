import { useState, useEffect } from "react";

const useGetCurrentPosition = () => {
  const [currentPosition, setCurrentPosition] = useState<CurrentPosition>({
    lat: 37.715133,
    lng: 126.734086,
  });

  const getCurrentPosition = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
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
