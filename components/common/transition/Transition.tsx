import {
  cloneElement,
  forwardRef,
  Fragment,
  PropsWithChildren,
  ReactNode,
  useContext,
  useRef,
  MutableRefObject,
  useLayoutEffect,
  useState,
  useEffect,
} from "react";
import useTransition from "@/components/common/transition/useTransition";
import {
  ChildrenContainer,
  TransitionChildComponentProps,
  TransitionComponentProps,
} from "@/types/transition";

import { createContext } from "react";
import { useChildren } from "./useChildren";
import { hasChildren } from "./util";

const TransitionContext = createContext<{
  childrenContainer: MutableRefObject<ChildrenContainer[]>;
  isShow: boolean;
} | null>(null);

function useTransitionContext() {
  let context = useContext(TransitionContext);

  if (context === null) {
    throw new Error(
      "<TransitionComponent.Child />를 사용하려면 <TransitionComponent />가 필요합니다."
    );
  }

  return context;
}

const Transition = (
  props: PropsWithChildren<TransitionComponentProps>,
  ref: MutableRefObject<HTMLElement>
) => {
  const {
    children,
    isVisible,
    enter,
    leave,
    enterFrom,
    enterTo,
    leaveFrom,
    leaveTo,
  } = props;
  const containerRef = useRef<HTMLElement | null>(null);
  const [state, setState] = useState(isVisible);

  const renderProps = {
    //@ts-ignore
    className: `${children?.props.className}`,
    ref: containerRef,
  };

  const { transitionableChildren, register } = useChildren({
    childContainer: containerRef,
    isVisible: state,
    initialValue: [],
    callback: () => {
      setState(false);
    },
  });

  useEffect(() => {
    if (isVisible) {
      setState(true);
    } else if (!hasChildren(transitionableChildren.current)) {
      setState(false);
    }
  }, [isVisible, transitionableChildren]);

  useTransition({
    node: containerRef,
    classes: {
      enter: enter || "",
      leave: leave || "",
      enterFrom: enterFrom || "",
      enterTo: enterTo || "",
      leaveFrom: leaveFrom || "",
      leaveTo: leaveTo || "",
    },
    direction: isVisible ? "enter" : "leave",
  });

  return (
    <TransitionContext.Provider
      value={{ isShow: isVisible, childrenContainer: transitionableChildren }}
    >
      {render(children, state, renderProps)}
    </TransitionContext.Provider>
  );
};

const TransitionChild = (
  props: PropsWithChildren<TransitionChildComponentProps>,
  ref: MutableRefObject<HTMLElement>
) => {
  const { children, enter, leave, enterFrom, enterTo, leaveFrom, leaveTo } =
    props;
  const containerRef = useRef<HTMLElement | null>(null);

  const { isShow, childrenContainer } = useTransitionContext();
  const [state, setState] = useState(isShow);

  const renderProps = {
    //@ts-ignore
    className: `${children?.props.className}`,
    ref: containerRef,
  };

  const parentToChildState = isShow;

  const { register, unregister } = useChildren({
    childContainer: containerRef,
    isVisible: parentToChildState,
    initialValue: childrenContainer.current,
    callback: () => {
      setState(false);
      unregister(containerRef);
    },
  });

  useEffect(() => register(containerRef), [register, containerRef]);

  useEffect(() => {
    if (!containerRef.current) return;

    return () => {
      if (state) {
        register(containerRef);
      } else {
        unregister(containerRef, "unmount");
      }
    };
  }, [register, unregister, state]);
  console.log(containerRef);

  useTransition({
    node: containerRef,
    classes: {
      enter: enter || "",
      leave: leave || "",
      enterFrom: enterFrom || "",
      enterTo: enterTo || "",
      leaveFrom: leaveFrom || "",
      leaveTo: leaveTo || "",
    },
    direction: isShow ? "enter" : "leave",
  });
  return <Fragment>{render(children, state, renderProps)}</Fragment>;
};

function ChildFn(
  props: PropsWithChildren<
    TransitionChildComponentProps | TransitionComponentProps
  >,
  ref: MutableRefObject<HTMLElement>
) {
  if ("isVisible" in props) {
    // @ts-expect-error This is an object
    return <Transition ref={ref} {...props} />;
  } else {
    // @ts-expect-error This is an object
    return <TransitionChild ref={ref} {...props} />;
  }
}

function render(children: ReactNode, isVisible: boolean, props: any) {
  if (isVisible) {
    //@ts-ignore
    return cloneElement(children, props);
  }
}

function forwardRefWithAs<T extends { name: string; displayName?: string }>(
  component: T
): T & { displayName: string } {
  return Object.assign(forwardRef(component as unknown as any) as any, {
    displayName: component.displayName ?? component.name,
  });
}

export let TransitionComponent = Object.assign(Transition, {
  Child: forwardRefWithAs(ChildFn),
  Root: forwardRefWithAs(Transition),
});
