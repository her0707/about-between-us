"use client";

import { useRouter } from "next/navigation";

import KaKaoMap from "@/components/kakao-map";
import Input from "@/components/common/input";
import Button from "components/common/button";
import useGetCurrentPosition from "@/hooks/useGetCurrentPosition";

export default function Main() {
  const router = useRouter();
  const { currentPosition } = useGetCurrentPosition();

  const handleSearch = (type: string) => {
    router.push(`/search?type=${type}`);
  };

  return (
    <div className="relative h-screen w-full">
      <KaKaoMap defaultCoords={currentPosition} />
      <div className="absolute top-2 z-30 w-[calc(100%_-_10px)] left-[5px] p-[5px] rounded-[5px] bg-white flex">
        <div className="flex flex-col basis-10/12">
          <Input
            readOnly={true}
            className="cursor-pointer"
            onClick={() => handleSearch("type1")}
          />
          <Input
            readOnly={true}
            className="cursor-pointer"
            onClick={() => handleSearch("type2")}
          />
        </div>
        <div className="basis-2/12 ml-2">
          <Button className="w-full h-full text-xl" color="green">
            검색
          </Button>
        </div>
      </div>
    </div>
  );
}