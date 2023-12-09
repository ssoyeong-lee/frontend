import { useGame } from "@/hooks/data/useGame";
import GameBoard from "@/layouts/Gameboard";
import { draw } from "@/utils/draw";
import { useEffect, useRef } from "react";

export default function Game() {
  const { gameInfo } = useGame();
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (gameInfo === null) return;
    if (ref.current === null) return;
    const curCtx = ref.current.getContext("2d");
    if (curCtx === null) return;
    draw(curCtx, 100, 200, gameInfo);
  }, [gameInfo]);
  return (
    <GameBoard>
      <canvas
        ref={ref}
        id="pongCanvas"
        width="100"
        height="200"
        className="w-full h-full"
      />
    </GameBoard>
  );
}
