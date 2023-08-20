"use client";

import { useState, ChangeEvent, KeyboardEvent, useEffect, useRef } from "react";
import { useAtom } from "jotai";

import Input from "@/components/common/input";
import { getKakaoSearchAddress } from "@/service/kakao-map";
import SearchIcon from "components/common/icons/search-icon";
import AddressListItem from "./AddressListItem";
import { addressSearchAtom } from "store/address";
import { selectAddressInitialValue } from "@/constants/address-data";

const Search = () => {
  const [search, setSearch] = useState("");
  const [selectAddress, setSelectAddress] = useAtom(addressSearchAtom);
  const inputRef = useRef<HTMLInputElement>(null);

  const [addressList, setAddressList] = useState<KakaoSearchAddress[]>([]);

  useEffect(() => {
    inputRef.current?.focus();

    return () => {
      setSelectAddress(selectAddressInitialValue);
    };
  }, [setSelectAddress]);

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
    setSelectAddress({ addressName, ...location });
  };

  return (
    <>
      <Input
        ref={inputRef}
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
