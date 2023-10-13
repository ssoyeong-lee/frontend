import Button from "@/layouts/Button";
import FlexBox from "@/layouts/FlexBox";
import SideBox from "@/layouts/SideBox";
import TextBox from "@/layouts/TextBox";
import { useState } from "react";

export default function Register() {
  const [nickName, setNickName] = useState('');
  const myInput= (e: React.ChangeEvent<HTMLInputElement>)=>{
    setNickName(e.target.value);
    console.log(nickName);
  }

  return (
    <SideBox>
      <FlexBox direction="col" className="items-start gap-9">
        <FlexBox direction="col" className="items-start gap-3 ">
          <div className="font-bold text-5xl tracking-wider leading-[3.5rem]">
            Register
          </div>
        </FlexBox>
        <TextBox inputNickname={myInput} placeholder="Nickname" className="w-[25rem] h-[3rem] font-bold text-2xl tracking-wider bg-gray-100"/>
        <Button
          href="https://www.naver.com"
          className="border rounded w-[25rem] h-[3rem] bg-gray-500"
          textClassName="font-bold text-2xl tracking-wider"
        >
          Complete
        </Button>
      </FlexBox>
    </SideBox>
  );
}
