interface Props {
  className?: string;
  direction?: "row" | "col";
  onClick?: () => void;
  children: React.ReactNode;
}

export default function FlexBox({
  className,
  direction,
  onClick,
  children,
}: Props) {
  return (
    <div
      className={`flex ${
        direction === "col" ? "flex-col" : "flex-row"
      } ${className} ${className?.includes("items-") ? "" : "items-center"}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
