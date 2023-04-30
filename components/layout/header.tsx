"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const router = useRouter();

  return (
    <>
      <div className={`fixed z-20 m-auto h-14 w-full max-w-2xl bg-white`}>
        <a
          className="absolute h-14 w-14 cursor-pointer p-5 text-center"
          id={"backButton"}
          onClick={(e: any) => {
            router.back();
          }}
        >
          <Image
            src="/icons/arrow-left-icon.svg"
            width="18"
            height="16"
            alt="arrow-leff-icon"
          />
        </a>
      </div>
      <div className="h-14"></div>
    </>
  );
};

export default Header;