import React from "react";
import FlexBox from "./FlexBox";

interface Props {
  children: React.ReactNode;
}
export default function GameBoard({ children }: Props) {
  return (
    <FlexBox className="w-full h-full justify-center">
      <div className="relative h-full w-1/3 bg-cover-white drop-shadow-board">
        <div className="absolute z-0 top-1/4 w-full h-1/2">
          <div className="absolute z-0 top-1/2 w-full border-dashed border-[1px] border-white" />
          <div className="absolute z-0 top-1/4 right-[20px] text-xl">soylee</div>
          <div className="absolute z-0 top-3/4 right-[20px] text-xl">sryou</div>
        </div>
        <div className="absolute z-0 top-1/4 left-[20px] text-3xl">01</div>
        <div className="absolute z-0 top-3/4 left-[20px] text-3xl">03</div>
        {children}
      </div>
    </FlexBox>
  );
}
