import DefaultInput from "@/components/control/DefaultInput";
import FlexBox from "@/layouts/FlexBox";
import Icon from "@/layouts/Icon";

interface Props {
  src: string;
  className?: string;
  placeholder?: string;
  color?: "white" | "red";
}

export default function IconInput({
  src,
  className,
  placeholder,
  color = "white",
}: Props) {
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
      />
    </div>
  );
}
