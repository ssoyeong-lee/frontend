import FlexBox from "@/layouts/FlexBox";
import LogoBox from "@/layouts/LogoBox";

interface Props {
  children: React.ReactNode;
}

export default function SideBox({ children }: Props) {
  return (
    <FlexBox direction="row" className="w-full h-full">
      <FlexBox direction="col" className="w-[1024px] h-full justify-center bg-white">
        {children}
      </FlexBox>
      <LogoBox />
    </FlexBox>
  );
}
