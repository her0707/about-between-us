"use client";

import { useAtom } from "jotai";
import { useRef, useState } from "react";

import AddressSearchModal from "../AddressSearch/AddressSearchModal";
import { usersLocationAtom } from "@/store/global";
import UserAddressButton from "./UserAddressButton";
import { modifyUserAddress } from "@/utils/userAddress";

const UserAddressForm = () => {
  const [usersLocation, setUsersLocation] = useAtom(usersLocationAtom);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const user = useRef<string>("");

  const handleSearch = (type: string) => {
    setModalIsVisible(true);
    user.current = type;
  };

  const handleInvisible = () => {
    setModalIsVisible(false);
    user.current = "";
  };

  const handleSubmit = (userAddress: UserAddress) => {
    setUsersLocation((prev) => modifyUserAddress(prev, userAddress));
    handleInvisible();
  };

  return (
    <div className="mx-6">
      <h1 className="text-xl font-bold">우리들의 출발지를 등록해보세요.</h1>

      <div className="mt-8 flex flex-col gap-y-4">
        {new Array(2).fill(0).map((_, i) => (
          <UserAddressButton
            key={`user-${i}`}
            type={`user-${i}`}
            handleSearch={handleSearch}
            address={
              usersLocation.find((v) => v.name === `user-${i}`)?.addressName
            }
          />
        ))}
      </div>
      <div className="text-xs text-gray-500 mt-6">
        현재 최대 2명의 사용자의 출발지만 등록 가능합니다.
      </div>
      <AddressSearchModal
        isVisible={modalIsVisible}
        handleInvisible={handleInvisible}
        handleSubmit={handleSubmit}
        user={user.current}
      />
    </div>
  );
};

export default UserAddressForm;