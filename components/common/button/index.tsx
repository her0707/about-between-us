import {
  ButtonHTMLAttributes,
  memo,
  MouseEventHandler,
  PropsWithChildren,
} from "react";

interface Props {
  className?: string;
  onClick?: MouseEventHandler;
  color?: "blue" | "gray" | "green" | "yellow" | "red" | "white" | "custom";
}

const Button = ({
  children,
  className = "",
  onClick,
  type = "button",
  color = "blue",
  disabled = false,
}: PropsWithChildren<Props> & ButtonHTMLAttributes<HTMLButtonElement>) => {
  let classname: string;
  switch (color) {
    case "gray":
      classname = `inline-block py-2.5 px-6 text-xs font-medium leading-tight text-gray-50 bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 active:bg-gray-500 rounded focus:outline-none focus:ring-0 shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out ${className}`;
      break;
    case "blue":
      classname = `inline-block py-2.5 px-6 text-xs font-medium leading-tight text-white bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800 rounded focus:outline-none focus:ring-0 shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out ${className}`;
      break;
    case "green":
      classname = `inline-block py-2.5 px-6 text-xs font-medium leading-tight text-white bg-[#12B564] hover:bg-green-500 focus:bg-green-500 active:bg-green-700 rounded focus:outline-none focus:ring-0 shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out ${className}`;
      break;
    case "red":
      classname = `inline-block py-2.5 px-6 text-xs font-medium leading-tight text-white bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-800 rounded focus:outline-none focus:ring-0 shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out ${className}`;
      break;
    case "yellow":
      classname = `inline-block py-2.5 px-6 text-xs font-medium leading-tight text-white bg-yellow-500 hover:bg-orange-600 focus:bg-orange-600 active:bg-orange-700 rounded focus:outline-none focus:ring-0 shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out ${className}`;
      break;
    case "white":
      classname = `inline-block py-2.5 px-6 text-xs font-medium leading-tight text-[#12B564] bg-white hover:bg-green-100 focus:bg-green-100 active:bg-green-100 border border-[#12B564] rounded focus:outline-none focus:ring-0 shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out ${className}`;
      break;
    case "custom":
      classname = `inline-block py-2.5 px-6 text-xs font-medium leading-tight rounded focus:outline-none focus:ring-0 shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out ${className}`;
      break;
    default:
      classname = `inline-block py-2.5 px-6 text-xs font-medium leading-tight text-white bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800 rounded focus:outline-none focus:ring-0 shadow-md hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out ${className}`;
      break;
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={classname}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default memo(Button);
