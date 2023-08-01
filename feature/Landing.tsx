import Link from "next/link";

import Button from "@/components/common/button";
import { ROUTE } from "constants/route";

const Landing = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center gap-y-60 py-10 items-center bg-black">
      <div className="flex flex-col gap-y-2 items-center">
        <h1 className="text-4xl font-bold text-white animate-fadeIn">
          About Between Us
        </h1>
        <h4 className="text-lg  font-medium text-white animate-fadeIn">
          우리 사이 여기쯤
        </h4>
      </div>

      <Link href={ROUTE.SEARCH}>
        <Button
          color="white"
          size="md"
          className="rounded-xl font-bold animate-fadeIn"
        >
          위치 등록하기
        </Button>
      </Link>
    </div>
  );
};

export default Landing;
