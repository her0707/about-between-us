"use client";

import { useState, ChangeEvent, KeyboardEvent } from "react";

import Input from "@/components/common/input";
import { getKakaoSearchAddress } from "@/service/kakao-map";
import SearchIcon from "components/common/icons/search-icon";

const Search = () => {
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

  return (
    <div>
      <Input
        value={search}
        onChange={handleChange}
        name="search"
        iconType="after"
        icon={<SearchIcon width={30} height={30} onClick={handleSearch} />}
        onKeyDown={handleOnKeyDown}
      />
      <ul className="mt-10">
        {addressList.map((v) => (
          <li className="border-b pb-2.5 cursor-pointer" key={v.address_name}>
            {v.address_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
