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
  return (
    <button
      className={`w-full px-2 py-3 bg-button-green hover:button-green-hover ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
