
import Button from "@/layouts/Button";
import FlexBox from "@/layouts/FlexBox";
import Side from "@/layouts/Side";

export default function Login() {
  return (
    <Side>
      <FlexBox direction="col" className="items-start gap-9">
          <FlexBox direction="col" className="items-start gap-3 ">
            <div className="font-bold text-5xl tracking-wider leading-[3.5rem]">Login</div>
            <div className="font-bold text-xl tracking-wider">Use 42 Account</div>
          </FlexBox>
          <Button className="w-[25rem] h-[3rem]" textClassName="font-bold text-2xl tracking-wider">
            42 Intra로 로그인
          </Button>
        </FlexBox>
    </Side>
  );
}