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
  TransitionChildComponentProps,
  TransitionComponentProps,
  TransitionContext,
} from "@/types/transition";

import { createContext } from "react";
import { useChildren } from "./useChildren";
import { hasChildren } from "./util";

const TransitionContext = createContext<TransitionContext | null>(null);

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
  // TODO: Child 없이 단독 사용 구현필요

  const { children, isVisible } = props;
  const containerRef = useRef<HTMLElement | null>(null);
  const [state, setState] = useState(isVisible);

  const renderProps = {
    //@ts-ignore
    className: `${children?.props.className}`,
    ref: containerRef,
    ...props,
  };

  const childrenInfo = useChildren({
    callback: () => {
      setState(false);
    },
  });

  useEffect(() => {
    if (isVisible) {
      setState(true);
    }
  }, [isVisible]);

  return (
    <TransitionContext.Provider value={{ isShow: isVisible, childrenInfo }}>
      {/* {render(
        <TransitionChildForwardRef {...renderProps}>
          {children}
        </TransitionChildForwardRef>,
        state,
        renderProps
      )} */}
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

  const { isShow, childrenInfo } = useTransitionContext();
  const [state, setState] = useState(isShow);

  const { register, unregister } = childrenInfo;

  const renderProps = {
    //@ts-ignore
    className: `${children?.props.className}`,
    ref: containerRef,
  };

  useChildren({
    callback: () => {
      setState(false);
      unregister(containerRef);
    },
  });

  useEffect(() => {
    register(containerRef);
  }, [containerRef, register]);

  useEffect(() => {
    if (!containerRef.current) return;

    return () => {
      if (state) {
        register(containerRef);
      } else {
        unregister(containerRef, "unmount");
      }
    };
  }, [register, unregister, state, containerRef]);

  let direction: "enter" | "leave" = isShow ? "enter" : "leave";

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
    direction,
    callback: () => {
      if (direction === "leave") {
        setState(false);
        unregister(containerRef, "unmount");
      }
    },
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
): T {
  return Object.assign(forwardRef(component as unknown as any) as any, {
    displayName: component.name,
  });
}

const TransitionRootForwardRef = forwardRefWithAs(Transition);
const TransitionChildForwardRef = forwardRefWithAs(TransitionChild);
const TransitionChildFnForwardRef = forwardRefWithAs(ChildFn);

export let TransitionComponent = Object.assign(Transition, {
  Child: TransitionChildFnForwardRef,
  Root: TransitionRootForwardRef,
});
