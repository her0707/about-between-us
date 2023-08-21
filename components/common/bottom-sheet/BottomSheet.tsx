import { bottomSheetConst } from "@/constants/ui";
import { PropsWithChildren } from "react";
import Header from "./Header";
import useBottomSheet from "./useBottomSheet";

const BottomSheet = (props: PropsWithChildren<BottomSheetProps>) => {
  const { sheetRef, height, initBottomSheetY } = useBottomSheet(props);

  return (
    <div
      ref={sheetRef}
      style={{
        height,
        transform: `translateY(${initBottomSheetY}px)`,
      }}
      className="fixed bg-white rounded-t-xl h-20 bottom-0 max-w-screen-sm w-full ease-out duration-300 z-40 shadow-md"
    >
      <Header />
      {props.children}
    </div>
  );
};

export default BottomSheet;
