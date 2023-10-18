import FlexBox from "@/layouts/FlexBox";
import Icon from "@/layouts/Icon";
import { useState } from "react";

interface Props {
  list: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function SelectBox({ list, value, onChange }: Props) {
  const [isSelect, setIsSelect] = useState(false);
  const clickSelect = () => {
    setIsSelect(true);
  };
  const clickList = (item: string) => {
    setIsSelect(false);
    onChange(item);
  };
  return (
    <div className="w-full relative">
      {isSelect ? (
        <FlexBox
          className="absolute w-full top-0 border border-white"
          direction="col"
        >
          {list.map((item, idx) => {
            return (
              <div
                className="w-full h-full pl-4 vertical-middle p-4 hover:bg-gray-600 cursor-pointer"
                onClick={() => clickList(item)}
                key={idx}
              >
                {item}
              </div>
            );
          })}
        </FlexBox>
      ) : (
        <div className="w-full h-full cursor-pointer" onClick={clickSelect}>
          <FlexBox className="w-full h-full border border-white p-4 justify-between">
            <div>{value}</div>
            <Icon
              src="/icon/arrow-down.png"
              className="w-[24px] h-[24px]"
              alt="icon"
            />
          </FlexBox>
        </div>
      )}
    </div>
  );
}
