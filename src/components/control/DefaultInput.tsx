interface Props {
  className?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  size?: "sm" | "lg";
  color?: "white" | "red";
  type?: "text" | "password";
}

export default function DefaultInput({
  className,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  size = "lg",
  color = "white",
  type = "text",
}: Props) {
  const padding = size === "lg" ? "p-4" : "px-4 py-2";
  const borderColor =
    color === "white" ? "border-white" : "border-deepred-cyber";
  return (
    <div className="w-full">
      <input
        className={`w-full h-full bg-[#00000000] ${padding} border ${borderColor} ${className}`}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
      />
    </div>
  );
}
