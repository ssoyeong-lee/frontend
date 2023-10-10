
import FlexBox from "@/layouts/FlexBox";
import LogoBox from "@/layouts/LogoBox";

interface Props{
  children: React.ReactNode;
}

export default function Side({children}:Props) {
  return (
    <FlexBox direction="row" className=" h-full w-full">
      <FlexBox direction="col" className="h-full  w-3/5 justify-center bg-white">
          {children}
      </FlexBox>
      <LogoBox></LogoBox>
    </FlexBox>
  );
}