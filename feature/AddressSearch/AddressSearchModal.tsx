"use client";

import { useAtom } from "jotai";

import Modal from "@/components/common/modal";
import Search from "./Search";
import { addressSearchAtom } from "@/store/address";

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
  const [selectAddress, setSelectAddress] = useAtom(addressSearchAtom);

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
      <Search />
    </Modal>
  );
};

export default AddressSearchModal;
