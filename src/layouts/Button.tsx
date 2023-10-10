import FlexBox from "@/layouts/FlexBox";

interface Props {
  className?: string;
  textClassName?: string;
  children: React.ReactNode;
}

export default function Button({ className, textClassName, children }: Props) {
  return (
    <FlexBox direction="col" className={`justify-center ${className} 
      ${className?.includes("bg-") ? "" : "bg-[#3691FC]" }`}>
      <div className={`w-fit h-fit text-white ${textClassName}`}>
        {children}
      </div>
    </FlexBox>
  );
}
