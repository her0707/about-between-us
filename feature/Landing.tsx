import Image from "next/image";

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

      <a className="bg-white w-14 h-14 p-2 rounded-xl  animate-fadeIn cursor-pointer">
        <Image
          src="/icons/kakao_map.png"
          alt="kakao-map-icon"
          width="64"
          height="64"
        />
      </a>
    </div>
  );
};

export default Landing;
