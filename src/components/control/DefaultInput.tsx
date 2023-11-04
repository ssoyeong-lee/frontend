import { RefObject, forwardRef } from "react";

interface Props {
  className?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  ref?: RefObject<HTMLInputElement>;
  placeholder?: string;
  size?: "sm" | "lg";
  color?: "white" | "red";
}

export default forwardRef<HTMLInputElement, Props>(function DefaultInput(
  {
    className,
    name,
    value,
    onChange,
    onFocus,
    onBlur,
    placeholder,
    size = "lg",
    color = "white",
  }: Props,
  ref
) {
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
        onFocus={onFocus}
        ref={ref}
      />
    </div>
  );
});
