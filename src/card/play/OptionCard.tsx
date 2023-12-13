import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";
import { Option } from "@/pages/play/index";
import { Dispatch, SetStateAction } from "react";

interface Props {
  option: Option;
  setOption: Dispatch<SetStateAction<Option>>;
}

export default function OptionCard({ option, setOption }: Props) {
  const selectedStyle = "cursor-pointer text-white";
  const unselectedStyle = "cursor-pointer text-gray-400 hover:text-white";
  return (
    <Card>
      <FlexBox
        className="text-2xl font-bold text-center gap-12"
        direction="col"
      >
        <div className="text-4xl">Option</div>
        <FlexBox className="w-full justify-between">
          <div>SPEED</div>
          <FlexBox>
            <div className={`w-[150px] ${selectedStyle}`}>Normal</div>
          </FlexBox>
        </FlexBox>
        <FlexBox className="w-full justify-between">
          <div>MODE</div>
          <FlexBox>
            <div
              className={`w-[150px] ${
                option.mode === "standard" ? selectedStyle : unselectedStyle
              }`}
              onClick={() => setOption({ ...option, mode: "standard" })}
            >
              Standard
            </div>
            <div
              className={`w-[150px] 
            ${option.mode === "extreme" ? selectedStyle : unselectedStyle}`}
              onClick={() => setOption({ ...option, mode: "extreme" })}
            >
              Extreme
            </div>
          </FlexBox>
        </FlexBox>
        <FlexBox className="w-full justify-between">
          <div>TYPE</div>
          <FlexBox>
            <div className={`w-[150px] ${selectedStyle}`}>Ladder</div>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Card>
  );
}
