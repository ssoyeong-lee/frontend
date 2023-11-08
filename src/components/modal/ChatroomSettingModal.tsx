import FlexBox from "@/layouts/FlexBox";
import DefaultInput from "../control/DefaultInput";
import SquareButton from "../button/SquareButton";
import { useState } from "react";

export default function ChatroomSettinngModal() {
  const [pw, setPw] = useState<string>();
  const [again, setAgain] = useState<string>();

  const pwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };
  const againChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgain(e.target.value);
  };

  return (
    <FlexBox
      direction="col"
      className="w-[300px] h-[324px] gap-6 p-6 text-base tracking-wider bg-gray-600"
    >
      <div className="font-bold">Change Password</div>
      <FlexBox direction="col" className="w-full h-full gap-3">
        <DefaultInput
          placeholder="new"
          onChange={pwChange}
          className="bg-gray-700"
          type="password"
        />
        <DefaultInput
          placeholder="again"
          onChange={againChange}
          className="bg-gray-700"
          type="password"
        />
        <div className="h-6 w-full">
          {again && pw !== again ? (
            <div className="text-red-cyber text-right">wrong password</div>
          ) : (
            <></>
          )}
        </div>
      </FlexBox>
      <FlexBox className="w-full justify-end">
        <SquareButton className="w-[150px]">Ok</SquareButton>
      </FlexBox>
    </FlexBox>
  );
}
