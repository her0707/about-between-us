import { useEffect, useRef, useState, useLayoutEffect, useMemo } from "react";
import {
  addClasses,
  splitClasses,
  removeClasses,
  nextFrame,
  waitForTransition,
} from "./util";
import { TransitionProps } from "@/types/transition";

interface Transition extends Omit<TransitionProps, "node"> {
  node: HTMLElement;
}

function transition({ node, classes, direction, callback }: Transition) {
  if (direction === "enter") {
    node.removeAttribute("hidden");
    node.style.display = "";
  }

  const classList = {
    enter: splitClasses(classes.enter),
    enterFrom: splitClasses(classes.enterFrom),
    enterTo: splitClasses(classes.enterTo),
    leave: splitClasses(classes.leave),
    leaveFrom: splitClasses(classes.leaveFrom),
    leaveTo: splitClasses(classes.leaveTo),
  };

  const base = {
    enter: classList.enter,
    leave: classList.leave,
  };
  const to = {
    enter: classList.enterTo,
    leave: classList.leaveTo,
  };

  const from = {
    enter: classList.enterFrom,
    leave: classList.leaveFrom,
  };

  removeClasses(node, [
    ...classList.enter,
    ...classList.enterTo,
    ...classList.enterFrom,
    ...classList.leave,
    ...classList.leaveFrom,
    ...classList.leaveTo,
  ]);
  addClasses(node, [...base[direction], ...from[direction]]);

  nextFrame(() => {
    removeClasses(node, [...from[direction]]);
    addClasses(node, [...to[direction]]);

    waitForTransition(node, () => {
      removeClasses(node, [...base[direction]]);

      return callback();
    });
  });
}

function useTransition({
  node,
  classes,
  direction = "enter",
  callback,
}: TransitionProps) {
  useLayoutEffect(() => {
    if (!node.current) return;

    let container = node.current;

    transition({ node: container, classes, direction, callback });
  }, [classes, direction, node, callback]);
}

export default useTransition;
