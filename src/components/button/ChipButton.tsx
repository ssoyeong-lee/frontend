interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  color: "white" | "green" | "red" | "white-contain";
}

export default function ChipButton({
  children,
  color,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: Props) {
  let colorClass = "";
  switch (color) {
    case "white":
      colorClass = "border-white hover:bg-white hover:text-black";
      break;
    case "white-contain":
      colorClass =
        "border-white bg-white text-black hover:bg-black hover:text-white";
      break;
    case "green":
      colorClass = "border-green-cyber hover:bg-green-cyber hover:text-black";
      break;
    case "red":
      colorClass =
        "border-deepred-cyber hover:bg-deepred-cyber hover:text-black";
      break;
  }
  return (
    <button
      className={`px-2 py-1 border-[1.5px] ${colorClass} ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  );
}
