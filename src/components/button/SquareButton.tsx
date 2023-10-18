interface SquareButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function SquareButton({
  children,
  className,
  onClick,
}: SquareButtonProps) {
  const width = className?.includes("w-") ? "" : "w-full";
  return (
    <button
      className={`px-2 py-3 bg-button-green hover:button-green-hover ${className} ${width}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
