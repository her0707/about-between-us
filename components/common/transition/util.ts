import { State } from "./transition-const";
import { ChildrenContainer, TransitionProps } from "@/types/transition";

interface Transition extends Omit<TransitionProps, "node"> {
  node: HTMLElement;
}

export function hasChildren(children: ChildrenContainer[]) {
  return (
    children
      .filter(({ el }) => el)
      .filter(({ state }) => state === State.Visible).length > 0
  );
}

export function transition({ node, classes, direction }: Transition) {
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
    });
  });
}

function splitClasses(classes: string = "") {
  return classes.split(" ").filter((className) => className.trim().length > 1);
}

function nextFrame(...args: Parameters<typeof requestAnimationFrame>) {
  requestAnimationFrame(...args);
}
function addClasses(node: HTMLElement | null, classes: string[]) {
  node && classes.length > 0 && node.classList.add(...classes);
}

function removeClasses(node: HTMLElement | null, classes: string[]) {
  node && classes.length > 0 && node.classList.remove(...classes);
}

function waitForTransition(node: HTMLElement, callback: () => void) {
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
