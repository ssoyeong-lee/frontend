interface Props {
  className?: string;
  placeholder?: string;
  size?: "sm" | "lg";
  color?: "white" | "red";
}

export default function DefaultInput({
  className,
  placeholder,
  size = "lg",
  color = "white",
}: Props) {
  const padding = size === "lg" ? "p-4" : "px-4 py-2";
  const borderColor =
    color === "white" ? "border-white" : "border-deepred-cyber";
  return (
    <div className="w-full">
      <input
        className={`w-full h-full bg-[#00000000] ${padding} border ${borderColor} ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
}
