import FlexBox from "@/layouts/FlexBox";
import Link from "next/link"

interface Props {
  href: string;
  className?: string;
  textClassName?: string;
  children: React.ReactNode;
}

export default function Button({href, className, textClassName, children }: Props) {
  return (
    <Link href={href} passHref>
      <FlexBox direction="col" className={`justify-center ${className} 
        ${className?.includes("bg-") ? "" : "bg-button-green" }`}>
        <div className={`w-fit h-fit text-white ${textClassName}`}>
          {children}
        </div>
      </FlexBox>
    </Link>
  );
}
