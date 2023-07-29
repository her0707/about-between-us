import { ReactNode } from "react";

import Button from "../button";
import Portal from "@/components/portal";

interface Props {
  title: string;
  children: ReactNode;
  type: "submit" | "cancel";
  isVisible: boolean;
  handleInvisible: () => void;
  handleSubmit?: () => void;
}

const Modal = ({
  title,
  children,
  type = "submit",
  handleInvisible,
  handleSubmit,
  isVisible,
}: Props) => {
  return (
    isVisible && (
      <Portal selector="#portal">
        <div className="fixed top-0 max-w-screen-sm left-1/2 -translate-x-1/2 flex justify-center items-center  z-40 w-screen h-screen">
          <div className="bg-white shadow-sm rounded-xl p-4 min-w-[300px]">
            <h2 className="font-bold text-lg">{title}</h2>
            {children}
            <div className="flex gap-x-2 mt-3">
              <Button
                className="flex-1"
                color="white"
                onClick={handleInvisible}
              >
                취소
              </Button>
              {type === "submit" && (
                <Button className="flex-1" color="black" onClick={handleSubmit}>
                  확인
                </Button>
              )}
            </div>
          </div>
        </div>
      </Portal>
    )
  );
};

export default Modal;
