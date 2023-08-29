"use client";

import { useAtomValue, useAtom } from "jotai";
import { Map, CustomOverlayMap } from "react-kakao-maps-sdk";
import { memo } from "react";

import { isMapLoadedAtom } from "@/store/global";
import useGetCurrentPosition from "@/hooks/useGetCurrentPosition";

interface Props {
  usersLocation: UserAddress[];
}

const MapContent = ({ usersLocation }: Props) => {
  const isMapLoaded = useAtomValue(isMapLoadedAtom);
  const { currentPosition } = useGetCurrentPosition();

  const onCreate = async (map: kakao.maps.Map) => {
    setBounds(map, usersLocation);

    searchBetweenSubways();
  };

  const setBounds = (map: kakao.maps.Map, locations: UserAddress[]) => {
    const latLngBounds = new kakao.maps.LatLngBounds();
    locations.forEach((address) => {
      latLngBounds.extend(
        new kakao.maps.LatLng(Number(address.lat), Number(address.lng))
      );
    });

    map.setBounds(latLngBounds, 120);
  };

  const searchBetweenSubways = () => {
    const places = new kakao.maps.services.Places();

    const callback = (
      result: kakao.maps.services.PlacesSearchResult,
      status: kakao.maps.services.Status
    ) => {
      if (status === kakao.maps.services.Status.OK) {
        console.log(result);
      }
    };

    places.categorySearch("SW8", callback, {
      useMapBounds: true,
      useMapCenter: true,
      radius: 5000,
    });
  };

  return isMapLoaded ? (
    <Map
      center={{
        lat: Number(currentPosition.lat),
        lng: Number(currentPosition.lng),
      }}
      style={{ width: "100%", height: "100%" }}
      onCreate={onCreate}
    >
      {usersLocation.map((address, key) => (
        <CustomOverlayMap
          key={address.name}
          position={{
            lat: Number(address.lat),
            lng: Number(address.lng),
          }}
          yAnchor={1}
        >
          <div className="user-overlay">
            <span className="title">{key + 1}</span>
          </div>
        </CustomOverlayMap>
      ))}
    </Map>
  ) : null;
};

export default memo(MapContent);
