import {
  ButtonHTMLAttributes,
  memo,
  MouseEventHandler,
  PropsWithChildren,
} from "react";

type Color = "blue" | "gray" | "green" | "yellow" | "red" | "white" | "black";
type Size = "xs" | "md" | "lg";

interface Props {
  className?: string;
  onClick?: MouseEventHandler;
  color?: Color;
  size?: Size;
}

type ColorVariant = {
  [key in Color]: string;
};

type SizeVariant = {
  [key in Size]: string;
};

const colorVariant: ColorVariant = {
  gray: "text-gray-50 bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 active:bg-gray-500",
  blue: "text-white bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800 ",
  red: "text-white bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-800",
  green:
    "text-white bg-[#12B564] hover:bg-green-500 focus:bg-green-500 active:bg-green-700",
  yellow:
    "text-white bg-yellow-500 hover:bg-orange-600 focus:bg-orange-600 active:bg-orange-700",
  white:
    "text-[#12B564] bg-white hover:bg-green-100 focus:bg-green-100 active:bg-green-100 border border-[#12B564]",
  black: "bg-white text-black hover:bg-gray-200 active:bg-gray-200",
};

const sizeVariant: SizeVariant = {
  xs: "py-2.5 px-6 text-xs ",
  md: "py-3 px-6 text-md ",
  lg: "py-3 px-6 text-lg ",
};

const Button = ({
  children,
  className = "",
  onClick,
  type = "button",
  color = "blue",
  disabled = false,
  size = "xs",
}: PropsWithChildren<Props> & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-block rounded focus:outline-none focus:ring-0 shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out ${colorVariant[color]} ${sizeVariant[size]}  ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default memo(Button);
