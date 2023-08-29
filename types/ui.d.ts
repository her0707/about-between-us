interface ModalProps {
  title: string;
  type: "submit" | "cancel";
  isVisible: boolean;
  handleInvisible: () => void;
  handleSubmit: () => void;
}

interface BottomSheetProps {
  snapPoints?: (maxHeight: number) => number[];
}
