import React from "react";
import FlexBox from "./FlexBox";
import { useGame } from "@/hooks/data/useGame";

interface Props {
  children: React.ReactNode;
}
export default function GameBoard({ children }: Props) {
  const { gameInfo, gameStartInfo } = useGame();
  return (
    <FlexBox className="w-full h-full justify-center">
      <div className="relative h-full aspect-gameBoardRatio bg-cover-white drop-shadow-board">
        <div className="absolute z-0 top-1/4 w-full h-1/2">
          <div className="absolute z-0 top-1/2 w-full border-dashed border-[1px] border-white" />
          <div className="absolute z-0 top-1/4 right-[20px] text-xl">
            {gameStartInfo?.oppense.info.nickname}
          </div>
          <div className="absolute z-0 top-3/4 right-[20px] text-xl">
            {gameStartInfo?.me.info.nickname}
          </div>
        </div>
        <div className="absolute z-0 top-1/4 left-[20px] text-3xl">
          {gameInfo?.oppense.score}
        </div>
        <div className="absolute z-0 top-3/4 left-[20px] text-3xl">
          {gameInfo?.me.score}
        </div>
        {children}
      </div>
    </FlexBox>
  );
}
