import { PropsWithChildren } from "react";
import Header from "./Header";
import Portal from "@/components/portal";
import useBottomSheet from "./useBottomSheet";

const BottomSheet = (props: PropsWithChildren<BottomSheetProps>) => {
  const {
    sheetRef,
    height,
    sheetContentRef,
    MIN,
    handleContentTouch,
    mouseHandlers,
  } = useBottomSheet(props);

  return (
    <Portal selector="#portal">
      <div
        ref={sheetRef}
        style={{
          height: `${height}px`,
          top: `calc(100% - ${MIN}px)`,
        }}
        {...mouseHandlers}
        className="fixed bg-white left-0 right-0 m-auto rounded-t-xl  will-change-transform max-w-screen-sm w-full ease-out duration-300 z-40 shadow-md flex flex-col"
      >
        <Header />
        <div
          className="overflow-auto h-[calc(100%_-_28px)] scrolling-touch"
          ref={sheetContentRef}
          onTouchStart={handleContentTouch}
        >
          {props.children}
        </div>
      </div>
    </Portal>
  );
};

export default BottomSheet;
