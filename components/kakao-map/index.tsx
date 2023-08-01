"use client";

import { useAtom } from "jotai";
import Script from "next/script";
import { useEffect, useCallback } from "react";

import { isMapLoadedAtom } from "@/store/global";

declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  defaultCoords: CurrentPosition;
}

export default function KaKaoMap({ defaultCoords }: Props) {
  const [isMapLoaded, setIsMapLoaded] = useAtom(isMapLoadedAtom);

  const init = useCallback(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(
        defaultCoords.lat,
        defaultCoords.lng
      ),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);
  }, [defaultCoords.lat, defaultCoords.lng]);

  useEffect(() => {
    if (isMapLoaded) init();
  }, [init, isMapLoaded]);

  return (
    <>
      <Script
        type="text/javascript"
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_API_KEY}&libraries=services,clusterer,drawing&autoload=false`}
        onLoad={() =>
          window.kakao.maps.load(() => {
            setIsMapLoaded(true);
          })
        }
      ></Script>
      <div id="map" className="h-full w-full"></div>
    </>
  );
}
