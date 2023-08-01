import { MouseEvent } from "react";

import Button from "@/components/common/button";
import ClearIcon from "@/components/common/icons/clear-icon";

interface Props {
  handleSearch: (type: string) => void;
  handleRemove: (e: MouseEvent<HTMLAnchorElement>, type: string) => void;
  type: string;
  address?: string;
}

const UserAddressButton = ({
  handleSearch,
  type,
  address = "",
  handleRemove,
}: Props) => {
  return (
    <>
      <Button
        color="white"
        size="md"
        className="cursor-pointer border rounded-xl text-left !px-4 flex items-center justify-between"
        onClick={() => handleSearch(type)}
      >
        <span>{address || "출발지를 지정해주세요."}</span>
        {address && (
          <ClearIcon
            width="20"
            height="20"
            onClick={(e) => handleRemove(e, type)}
          />
        )}
      </Button>
    </>
  );
};

export default UserAddressButton;
