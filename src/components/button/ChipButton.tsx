interface Props {
  children: React.ReactNode;
  className?: string;
  color: "white" | "grean" | "red";
  onClick?: () => void;
}

export default function ChipButton({
  children,
  color,
  className,
  onClick,
}: Props) {
  let colorClass = "";
  switch (color) {
    case "white":
      colorClass = "border-white hover:bg-white hover:text-black";
      break;
    case "grean":
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
    >
      {children}
    </button>
  );
}
