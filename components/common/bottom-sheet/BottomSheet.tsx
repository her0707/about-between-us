import { PropsWithChildren } from "react";
import Header from "./Header";
import Portal from "@/components/portal";
import useBottomSheet from "./useBottomSheet";

const BottomSheet = (props: PropsWithChildren<BottomSheetProps>) => {
  const { sheetRef, height, sheetContentRef, handlers, handleContentTouch } =
    useBottomSheet(props);

  return (
    <Portal selector="#portal">
      <div className="max-w-screen-sm m-auto max-h-screen relative">
        <div
          ref={sheetRef}
          style={{
            height: `${height}px`,
            top: `calc(100% - 100px)`,
          }}
          className="fixed bg-white left-0 right-0 m-auto rounded-t-xl  will-change-transform max-w-screen-sm w-full ease-out duration-300 z-40 shadow-md"
          {...handlers}
        >
          <Header />
          <div
            onTouchStart={handleContentTouch}
            className="overflow-auto h-[calc(100%_-_28px)] scrolling-touch"
            ref={sheetContentRef}
          >
            {props.children}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default BottomSheet;
