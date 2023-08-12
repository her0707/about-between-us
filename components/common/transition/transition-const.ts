export type State = "visible" | "hidden" | "unmount";

export const State = {
  Visible: "visible",
  Hidden: "hidden",
  Unmount: "unmount",
} satisfies {
  [key in string]: State;
};
