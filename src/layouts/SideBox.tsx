import FlexBox from "@/layouts/FlexBox";
import LogoBox from "@/layouts/LogoBox";

interface Props {
  children: React.ReactNode;
  animate?: boolean;
}

export default function SideBox({ children, animate }: Props) {
  return (
    <FlexBox
      direction="row"
      className={`absolute right-0 h-full overflow-hidden ${
        animate ? "animate-sidenav-open w-[calc(100%+530px)]" : "w-full"
      }`}
    >
      <FlexBox
        direction="col"
        className="w-[530px] px-16 h-full justify-center bg-white"
      >
        {children}
      </FlexBox>
      <LogoBox />
    </FlexBox>
  );
}
