import Header from "./Header";
import useBottomSheet from "./useBottomSheet";

const BottomSheet = (props: BottomSheetProps) => {
  const { sheetRef } = useBottomSheet(props);

  return (
    <div
      ref={sheetRef}
      className="fixed bg-white rounded-t-xl h-20 bottom-0 max-w-screen-sm w-full ease-out duration-100 z-40 shadow-md"
    >
      <Header />
    </div>
  );
};

export default BottomSheet;
