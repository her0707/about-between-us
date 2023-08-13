import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { hasChildren } from "./util";
import { State } from "components/common/transition/transition-const";
import { ChildrenContainer } from "@/types/transition";
import { ChildrenHookProps } from "@/types/transition";

export const useChildren = ({ callback }: ChildrenHookProps) => {
  const transitionableChildren = useRef<ChildrenContainer[]>([]);

  const unregister = useCallback(
    (
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
    },
    [callback]
  );

  const register = useCallback(
    (container: MutableRefObject<HTMLElement | null>) => {
      if (!container.current) return;

      const child = transitionableChildren.current.find(
        ({ el }) => el === container.current
      );
      if (!child) {
        transitionableChildren.current.push({
          el: container.current,
          state: State.Visible,
        });
      }
    },
    []
  );

  return {
    register,
    unregister,
    transitionableChildren,
  };
};
