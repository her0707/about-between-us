import { PropsWithChildren } from "react";
import Header from "./Header";
import Portal from "@/components/portal";
import useBottomSheet from "./useBottomSheet";

const BottomSheet = (props: PropsWithChildren<BottomSheetProps>) => {
  const { sheetRef, height, sheetContentRef } = useBottomSheet(props);

  return (
    <Portal selector="#portal">
      <div
        ref={sheetRef}
        style={{
          height: `${height}px`,
          top: `calc(100% - 100px)`,
        }}
        className="fixed bg-white rounded-t-xl  will-change-transform max-w-screen-sm w-full ease-out duration-300 z-40 shadow-md"
      >
        <Header />
        <div
          className="overflow-auto h-[calc(100%_-_28px)] scrolling-touch"
          ref={sheetContentRef}
        >
          {props.children}
        </div>
      </div>
    </Portal>
  );
};

export default BottomSheet;
