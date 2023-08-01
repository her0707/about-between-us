import { MouseEventHandler } from "react";

interface Props {
  width: number | string;
  height: number | string;
  onClick: MouseEventHandler<HTMLAnchorElement>;
}

const ClearIcon = ({ width = "20", height = "20", onClick }: Props) => {
  return (
    <a onClick={onClick}>
      <svg
        width={width}
        height={height}
        fill="#C3C5C9"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
      >
        <path
          d="M38.28 10.7c-7.6-7.6-19.98-7.6-27.58 0-7.6 7.6-7.6 19.98 0 27.58 7.6 7.6 19.98 7.6 27.58 0 7.6-7.6 7.6-19.98 0-27.58Zm-9.55 20.15-4.24-4.24-4.24 4.24a1.499 1.499 0 1 1-2.12-2.12l4.24-4.24-4.24-4.24a1.499 1.499 0 1 1 2.12-2.12l4.24 4.24 4.24-4.24a1.499 1.499 0 1 1 2.12 2.12l-4.24 4.24 4.24 4.24a1.499 1.499 0 1 1-2.12 2.12Z"
          fill="#C3C5C9"
        ></path>
      </svg>
    </a>
  );
};

export default ClearIcon;
