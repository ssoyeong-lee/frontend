import FlexBox from "@/layouts/FlexBox";
import Icon from "@/layouts/Icon";

interface Props {
  src: string;
  className?: string;
  placeholder?: string;
}

export default function IconInput({ src, className, placeholder }: Props) {
  return (
    <div className="w-full relative">
      <div className="w-full h-[56px]"></div>
      <div className="h-full absolute z-1 top-0 right-0 text-end">
        <FlexBox className="justify-end pe-4 h-full">
          <Icon src={src} className="w-[30px] h-[30px]" alt="icon" />
        </FlexBox>
      </div>
      <input
        className={`w-full h-full absolute z-99 top-0 text-lg px-4 bg-[#00000000] ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
}
