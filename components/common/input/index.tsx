"use client";
import React, { InputHTMLAttributes, memo, ReactNode } from "react";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  label?: string;
  note?: string;
  error?: string | any;
  type?: string;
  shadow?: boolean;
  variant?: "normal" | "solid" | "outline";
  dimension?: "small" | "medium" | "big";
  iconType?: "before" | "after";
  icon?: ReactNode;
}
const classes = {
  root: "h-12 flex items-center w-full rounded block py-1.5 px-3 m-0 w-full text-base font-normal text-gray-700 text-heading text-sm appearance-none focus:ring-0 focus:text-gray-700 bg-clip-padding bg-white focus:bg-white border border-gray-300 border-solid focus:outline-none transition duration-300 ease-in-out form-control",
  normal:
    "border border-border-base focus:shadow focus:bg-light focus:border-accent",
};
const sizeClasses = {
  small: "text-sm h-8",
  medium: "h-10",
  big: "h-12",
};

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      label,
      note,
      name,
      error,
      children,
      dimension = "medium",
      shadow = false,
      type = "text",
      inputClassName = "",
      placeholder,
      iconType,
      icon,
      ...rest
    },
    ref
  ) => {
    const rootClassName = `${classes.root} ${sizeClasses[dimension]} ${inputClassName}`;
    const inputClass = `w-full h-full outline-none ${inputClassName}`;

    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={name}
            className="form-label mb-3 block text-sm font-semibold leading-none text-body-dark"
          >
            {label}
          </label>
        )}
        <div className={`inline-flex ${rootClassName}`}>
          {iconType === "before" && icon ? icon : null}
          <input
            id={name}
            name={name}
            type={type}
            ref={ref}
            className={inputClass}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            placeholder={placeholder}
            aria-invalid={error ? "true" : "false"}
            {...rest}
          />

          {iconType === "after" && icon ? icon : null}
        </div>
        {note && <p className="mt-2 text-xs text-gray-500">{note}</p>}
        {error && (
          <p className="my-1 rounded bg-red-100 px-2 text-start text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export default memo(Input);
