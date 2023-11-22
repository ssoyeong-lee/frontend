import DefaultInput from "@/components/control/DefaultInput";
import FlexBox from "@/layouts/FlexBox";
import Icon from "@/layouts/Icon";
import { RefObject, forwardRef } from "react";

interface Props {
  src: string;
  className?: string;
  placeholder?: string;
  color?: "white" | "red";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  ref?: RefObject<HTMLInputElement>;
}

export default forwardRef<HTMLInputElement, Props>(function IconInput(
  {
    src,
    className,
    placeholder,
    color = "white",
    value,
    onChange,
    onKeyPress,
    onFocus,
    onBlur,
  }: Props,
  ref
) {
  return (
    <div className="w-full relative">
      <div className="w-full h-[56px]"></div>
      <div className="h-full absolute z-1 top-0 right-0 text-end">
        <FlexBox className="justify-end pe-4 h-full">
          <Icon src={src} className="w-[30px] h-[30px]" alt="icon" />
        </FlexBox>
      </div>
      <DefaultInput
        className={"absolute z-99 top-0 " + className}
        placeholder={placeholder}
        color={color}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={ref}
      />
    </div>
  );
});
