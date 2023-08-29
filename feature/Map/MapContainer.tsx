"use client";

import { useRouter } from "next/navigation";
import Script from "next/script";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import { usersLocationAtom, isMapLoadedAtom } from "@/store/global";
import LocationText from "./LocationText";
import { ROUTE } from "@/constants/route";

import MapContent from "./Map";
import BottomSheet from "@/components/common/bottom-sheet/BottomSheet";

export default function MapContainer() {
  const setIsMapLoaded = useSetAtom(isMapLoadedAtom);
  const router = useRouter();
  const usersLocation = useAtomValue(usersLocationAtom);

  useEffect(() => {
    if (!usersLocation.length) router.replace(ROUTE.SEARCH);
  }, [router, usersLocation.length]);

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_API_KEY}&libraries=services,clusterer&autoload=false`}
        onLoad={() =>
          kakao.maps.load(() => {
            setIsMapLoaded(true);
          })
        }
      />
      <div className="relative h-[calc(100%_-_3.5rem)] w-full">
        <MapContent usersLocation={usersLocation} />
        <div className="absolute top-2 z-30 w-[calc(100%_-_10px)] left-[5px] p-[5px] rounded-[5px] bg-white flex flex-col gap-y-2">
          {usersLocation.map((address) => (
            <LocationText
              key={address.name}
              text={address.addressName}
            ></LocationText>
          ))}
        </div>
      </div>
      <BottomSheet>
        <ul>
          {new Array(50).fill("a").map((v, i) => (
            <li className="block rounded-lg border py-4- text-center" key={i}>
              {v}
            </li>
          ))}
        </ul>
      </BottomSheet>
    </>
  );
}
