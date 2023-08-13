import { ReactNode, PropsWithChildren } from "react";

import Button from "../button";
import Portal from "@/components/portal";
import { TransitionComponent } from "../transition/Transition";

const Modal = ({
  title,
  children,
  type = "submit",
  handleInvisible,
  handleSubmit,
  isVisible,
}: PropsWithChildren<ModalProps>) => {
  return (
    <Portal selector="#portal">
      <TransitionComponent isVisible={isVisible}>
        <div className="fixed inset-0 flex justify-center items-center z-40 ">
          <TransitionComponent.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
          </TransitionComponent.Child>
          <TransitionComponent.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="bg-white shadow-sm rounded-xl p-4 min-w-[300px] border z-50  ">
              <h2 className="font-bold text-lg mb-5">{title}</h2>
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
                  <Button
                    className="flex-1"
                    color="black"
                    onClick={handleSubmit}
                  >
                    확인
                  </Button>
                )}
              </div>
            </div>
          </TransitionComponent.Child>
        </div>
      </TransitionComponent>
    </Portal>
  );
};

export default Modal;
