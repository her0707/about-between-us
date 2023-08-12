import { useEffect, useRef, useState, useLayoutEffect, useMemo } from "react";
import { transition } from "./util";
import { TransitionProps } from "@/types/transition";

function useTransition({
  node,
  classes,
  direction = "enter",
}: TransitionProps) {
  useLayoutEffect(() => {
    if (!node.current) return;

    let container = node.current;

    console.log(direction);
    transition({ node: container, classes, direction });
  }, [classes, direction, node]);
}

export default useTransition;
