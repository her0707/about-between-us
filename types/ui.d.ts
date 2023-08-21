interface ModalProps {
  title: string;
  type: "submit" | "cancel";
  isVisible: boolean;
  handleInvisible: () => void;
  handleSubmit: () => void;
}

interface BottomSheetProps {
  maxY: number;
  minY: number;
  snapPoints?: (maxHeight: number) => number[];
}
