import FlexBox from "@/layouts/FlexBox";
import Link from "next/link"

interface Props {
  onClickBtn: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  textClassName?: string;
  children: React.ReactNode;
}

export default function Button({onClickBtn, className, textClassName, children }: Props) {
  return (
    <button onClick={onClickBtn}>
      <FlexBox direction="col" className={`justify-center ${className} 
        ${className?.includes("bg-") ? "" : "bg-button-green" }`}>
        <div className={`w-fit h-fit text-white ${textClassName}`}>
          {children}
        </div>
      </FlexBox>
    </button>
  );
}
