"use client";

import { useState, MutableRefObject } from "react";

import Modal from "@/components/common/modal";
import Search from "./Search";

interface Props extends Pick<ModalProps, "handleInvisible" | "isVisible"> {
  handleSubmit: (userAddress: UserAddress) => void;
  user: string;
}

const AddressSearchModal = ({
  handleInvisible,
  handleSubmit,
  isVisible,
  user,
}: Props) => {
  const [selectAddress, setSelectAddress] = useState<CurrentPosition>({
    lat: "",
    lng: "",
    addressName: "",
  });

  const handleModalSubmit = () => {
    handleSubmit({ ...selectAddress, name: user });
  };

  const handleSelectAddress = (position: CurrentPosition) => {
    setSelectAddress(position);
  };

  return (
    <Modal
      type="submit"
      title={"출발지를 검색해주세요"}
      handleInvisible={handleInvisible}
      handleSubmit={handleModalSubmit}
      isVisible={isVisible}
    >
      <Search
        handleSelectAddress={handleSelectAddress}
        selectAddress={selectAddress}
      />
    </Modal>
  );
};

export default AddressSearchModal;
