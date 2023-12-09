import FlexBox from "@/layouts/FlexBox";
import SideBox from "@/layouts/SideBox";

export default function Register() {
  return (
    <SideBox>
      <FlexBox direction="col" className="items-start gap-8">
        <FlexBox direction="col" className="items-start gap-3 ">
          <div className="text-black font-bold text-5xl tracking-wider leading-[3.5rem]">
            2fa
          </div>
        </FlexBox>
        <FlexBox direction="col" className="items-end gap-1">
          2fa2fa
        </FlexBox>
      </FlexBox>
    </SideBox>
  );
}
