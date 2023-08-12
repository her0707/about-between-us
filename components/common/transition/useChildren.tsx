import { MutableRefObject, useEffect, useRef } from "react";
import { hasChildren } from "./util";
import { State } from "components/common/transition/transition-const";
import { ChildrenContainer } from "@/types/transition";

interface ChildrenHookProps {
  childContainer: MutableRefObject<HTMLElement | null>;
  isVisible: boolean;
  initialValue?: ChildrenContainer[];
  callback?: () => void;
}

export const useChildren = ({
  childContainer,
  isVisible,
  initialValue,
  callback,
}: ChildrenHookProps) => {
  const transitionableChildren = useRef<ChildrenContainer[]>(
    initialValue || []
  );

  const register = (container: MutableRefObject<HTMLElement | null>) => {
    if (!container.current) return;

    const child = transitionableChildren.current.find(
      ({ el }) => el === container.current
    );
    if (!child) {
      transitionableChildren.current.push({
        el: container.current,
        state: State.Visible,
      });
    } else if (child.state !== State.Visible) {
      child.state = State.Visible;
    }

    return () => unregister(container, State.Unmount);
  };

  const unregister = (
    container: MutableRefObject<HTMLElement | null>,
    state: State = State.Hidden
  ) => {
    const idx = transitionableChildren.current.findIndex(
      ({ el }) => el === container.current
    );
    if (idx === -1) return;

    if (state === State.Hidden) {
      transitionableChildren.current[idx].state = State.Hidden;
    } else {
      transitionableChildren.current.splice(idx, 1);
    }

    queueMicrotask(() => {
      if (!hasChildren(transitionableChildren.current)) {
        callback && callback();
      }
    });
  };

  return {
    register,
    unregister,
    transitionableChildren,
  };
};
