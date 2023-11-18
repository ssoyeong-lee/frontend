import SquareButton from "@/components/button/SquareButton";
import DefaultInput from "@/components/control/DefaultInput";
import SelectBox from "@/components/control/SelectBox";
import FlexBox from "@/layouts/FlexBox";
import ModalCard from "@/layouts/ModalCard";
import { useState } from "react";

export default function ChannelCreateModal() {
  const [name, setName] = useState("");
  const [type, setType] = useState("private");
  const [pw, setPw] = useState("");

  const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }
  const typeChange = (type: string) => {
    setType(type);
  };
  const pwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  }
  return (
    <ModalCard className="w-[500px] h-[450px]">
      <FlexBox className="w-full h-full justify-between" direction="col">
        <div className="w-full">
          <div className="w-full text-xl font-bold mb-8 text-center">
            Create a new Channel
          </div>
          <FlexBox className="w-full gap-3" direction="col">
            <DefaultInput
              value={name}
              onChange={nameChange}
              placeholder="name"
            />
            <SelectBox
              list={["private", "protected", "public"]}
              value={type}
              onChange={typeChange}
            />
            {type === "protected" && (
              <DefaultInput
                placeholder="password"
                value={pw}
                onChange={pwChange}
                type="password"
              />
            )}
          </FlexBox>
        </div>
        <FlexBox className="w-full justify-end">
          <SquareButton className="w-[150px]">Ok</SquareButton>
        </FlexBox>
      </FlexBox>
    </ModalCard>
  );
}
