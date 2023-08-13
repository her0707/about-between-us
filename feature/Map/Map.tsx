"use client";

import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";

import KaKaoMap from "@/components/kakao-map";
import Button from "components/common/button";
import useGetCurrentPosition from "@/hooks/useGetCurrentPosition";

import { usersLocationAtom } from "@/store/global";
import UserAddressButton from "../UserAddress/UserAddressButton";
import LocationText from "./LocationText";
import { ROUTE } from "@/constants/route";

export default function Main() {
  const router = useRouter();
  const { currentPosition } = useGetCurrentPosition();
  const usersLocation = useAtomValue(usersLocationAtom);

  if (!usersLocation.length) router.replace(ROUTE.SEARCH);

  return (
    <div className="relative h-screen w-full">
      <KaKaoMap defaultCoords={currentPosition} />
      <div className="absolute top-2 z-30 w-[calc(100%_-_10px)] left-[5px] p-[5px] rounded-[5px] bg-white flex flex-col gap-y-2">
        {usersLocation.map((address) => (
          <LocationText
            key={address.name}
            text={address.addressName}
          ></LocationText>
        ))}
      </div>
    </div>
  );
}
