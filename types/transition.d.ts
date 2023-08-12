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
}
