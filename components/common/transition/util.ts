import { State } from "./transition-const";
import { ChildrenContainer, TransitionProps } from "@/types/transition";

export function splitClasses(classes: string = "") {
  return classes.split(" ").filter((className) => className.trim().length > 1);
}

export function nextFrame(...args: Parameters<typeof requestAnimationFrame>) {
  requestAnimationFrame(...args);
}
export function addClasses(node: HTMLElement | null, classes: string[]) {
  node && classes.length > 0 && node.classList.add(...classes);
}

export function removeClasses(node: HTMLElement | null, classes: string[]) {
  node && classes.length > 0 && node.classList.remove(...classes);
}

export function waitForTransition(node: HTMLElement, callback: () => void) {
  const { transitionDuration, transitionDelay } = getComputedStyle(node);

  const [durationMs, delayMs] = [transitionDuration, transitionDelay].map(
    (value) => {
      let [resolvedValue = 0] = value
        .split(",")
        .filter(Boolean)
        .map((v) => (v.includes("ms") ? parseFloat(v) : parseFloat(v) * 1000))
        .sort((a, z) => z - a);

      return resolvedValue;
    }
  );

  const totalDuration = durationMs + delayMs;

  const timer = setTimeout(() => {
    callback();
  }, totalDuration);
}

export function hasChildren(children: ChildrenContainer[]) {
  return (
    children
      .filter(({ el }) => el)
      .filter(({ state }) => state === State.Visible).length > 0
  );
}
