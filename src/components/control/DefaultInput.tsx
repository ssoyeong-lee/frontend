import FlexBox from "@/layouts/FlexBox";
import { RefObject, forwardRef, useState } from "react";

interface Props {
  className?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  ref?: RefObject<HTMLInputElement>;
  placeholder?: string;
  size?: "sm" | "lg";
  color?: "white" | "red";
  type?: "text" | "password";
  checkValid?: ((value: string) => string) | null;
}

export default forwardRef<HTMLInputElement, Props>(function DefaultInput(
  {
    className,
    name,
    value,
    onChange,
    onKeyPress,
    onFocus,
    onBlur,
    placeholder,
    size = "lg",
    color = "white",
    type = "text",
    checkValid,
  }: Props,
  ref
) {
  const padding = size === "lg" ? "p-4" : "px-4 py-2";
  const borderColor =
    color === "white" ? "border-white" : "border-deepred-cyber";

  const [msg, setMsg] = useState("");
  const inputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
    checkValid && setMsg(checkValid(e.target.value));
  };
  return (
    <FlexBox direction="col" className="w-full h-full items-end gap-1">
      <div className="w-full">
        <input
          className={`w-full h-full bg-[#00000000] ${padding} border ${borderColor} ${className}`}
          name={name}
          placeholder={placeholder}
          onKeyPress={onKeyPress}
          value={value ?? ""}
          onChange={inputChanged}
          onBlur={onBlur}
          type={type}
          onFocus={onFocus}
          ref={ref}
        />
      </div>
      <div className="h-fit w-fit text-xs tracking-wider text-red-cyber">
        {msg}
      </div>
    </FlexBox>
  );
});
