import { ReactNode, PropsWithChildren } from "react";

import Button from "../button";
import Portal from "@/components/portal";

const Modal = ({
  title,
  children,
  type = "submit",
  handleInvisible,
  handleSubmit,
  isVisible,
}: PropsWithChildren<ModalProps>) => {
  return isVisible ? (
    <Portal selector="#portal">
      <div className="fixed inset-0 flex justify-center items-center  z-40 ">
        <div className="bg-black opacity-30 fixed inset-0"></div>
        <div className="bg-white shadow-sm rounded-xl p-4 min-w-[300px] border z-50 ">
          <h2 className="font-bold text-lg mb-5">{title}</h2>
          {children}
          <div className="flex gap-x-2 mt-3">
            <Button className="flex-1" color="white" onClick={handleInvisible}>
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
  ) : null;
};

export default Modal;
