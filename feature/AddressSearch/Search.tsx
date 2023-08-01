"use client";

import { useState, ChangeEvent, KeyboardEvent } from "react";

import Input from "@/components/common/input";
import { getKakaoSearchAddress } from "@/service/kakao-map";
import SearchIcon from "components/common/icons/search-icon";
import AddressListItem from "./AddressListItem";

interface Props {
  handleSelectAddress: (position: UserAddress) => void;
  selectAddress: UserAddress;
}

const Search = ({ handleSelectAddress, selectAddress }: Props) => {
  const [search, setSearch] = useState("");

  const [addressList, setAddressList] = useState<KakaoSearchAddress[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  const handleSearch = async () => {
    try {
      const { data } = await getKakaoSearchAddress({ query: search });

      setAddressList(data.documents);
    } catch (e) {
      console.log(e);
    }
  };

  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClick = (addressName: string, location: GeoLocation) => {
    handleSelectAddress({ addressName, ...location });
  };

  return (
    <>
      <Input
        value={search}
        inputClassName="rounded-lg"
        onChange={handleChange}
        name="search"
        iconType="after"
        icon={<SearchIcon width={25} height={25} onClick={handleSearch} />}
        onKeyDown={handleOnKeyDown}
      />
      <ul className="mt-3">
        {addressList.map((v) => (
          <AddressListItem
            selectAddress={selectAddress?.addressName || ""}
            addressName={v.address_name}
            location={{ lat: v.y, lng: v.x }}
            key={v.address_name}
            handleClick={handleClick}
          />
        ))}
      </ul>
    </>
  );
};

export default Search;
