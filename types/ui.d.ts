interface ModalProps {
  title: string;
  type: "submit" | "cancel";
  isVisible: boolean;
  handleInvisible: () => void;
  handleSubmit: () => void;
}

interface BottomSheetProps {
  maxHeight: number;
  minHeight: number;
  snapPoints?: (maxHeight: number) => number[];
}
