import Button from "@/layouts/Button";
import FlexBox from "@/layouts/FlexBox";
import SideBox from "@/layouts/SideBox";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const onClickBtn= (e: React.MouseEvent<HTMLButtonElement>)=>{
    router.push("/register");
  }

  return (
    <SideBox>
      <FlexBox direction="col" className="items-start box-border gap-9">
        <FlexBox direction="col" className="items-start gap-3 ">
          <div className="text-black font-bold text-5xl tracking-wider leading-[3.5rem]">Login</div>
          <div className="text-black font-bold text-xl tracking-wider">Use 42 Account</div>
        </FlexBox>
        <Button onClickBtn={onClickBtn} className="border rounded w-[25rem] h-[3rem]" textClassName="font-bold text-2xl tracking-wider">
          42 Intra로 로그인
        </Button>
      </FlexBox>
    </SideBox>
  );
}