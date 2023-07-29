import Button from "@/components/common/button";

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

      <Button color="black" size="md" className="rounded-xl font-bold">
        위치 등록하기
      </Button>
    </div>
  );
};

export default Landing;
