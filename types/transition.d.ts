import { MutableRefObject } from "react";

interface TransitionComponentProps extends TransitionChildComponentProps {
  isVisible: boolean;
}

interface TransitionChildComponentProps {
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
}

interface ChildrenContainer {
  el: HTMLElement;
  state: "visible" | "hidden";
}

interface TransitionProps {
  node: MutableRefObject<HTMLElement | null>;
  classes: {
    enter: string;
    enterFrom: string;
    enterTo: string;
    leave: string;
    leaveFrom: string;
    leaveTo: string;
  };
  direction: "enter" | "leave";
  callback: () => void;
}

interface ChildrenHookProps {
  callback?: () => void;
}

interface TransitionContext {
  childrenInfo: {
    register: (container: MutableRefObject<HTMLElement | null>) => void;
    unregister: (
      container: MutableRefObject<HTMLElement | null>,
      state?: State
    ) => void;
    transitionableChildren: MutableRefObject<ChildrenContainer[]>;
  };
  isShow: boolean;
}
