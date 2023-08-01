import Button from "./button";

interface Props {
  className?: string;
  color?: "blue" | "gray" | "green" | "yellow" | "red" | "white" | "black";
  text: string;
  handleClick?: () => void;
}

const FloatingButton = ({
  className = "",
  color = "black",
  text,
  handleClick,
}: Props) => {
  return (
    <div className="fixed bottom-0 px-5 mb-5 w-full max-w-screen-sm">
      <Button
        color={color}
        className={`w-full rounded-lg font-bold ${className}`}
        size="md"
        onClick={handleClick}
      >
        {text}
      </Button>
    </div>
  );
};

export default FloatingButton;
