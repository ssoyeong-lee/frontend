import { useGame } from "@/hooks/data/useGame";
import { useSocket } from "@/hooks/useSocket";
import GameBoard from "@/layouts/Gameboard";
import { sendMoveBar } from "@/socket/game";
import { draw } from "@/utils/draw";
import { useEffect, useRef } from "react";

export default function Game() {
  const { socket } = useSocket();
  const { gameInfo, gameStartInfo } = useGame();
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (gameInfo === null) return;
    if (gameStartInfo === null) return;
    if (ref.current === null) return;
    const curCtx = ref.current.getContext("2d");
    if (curCtx === null) return;
    draw(curCtx, gameStartInfo, gameInfo);
  }, [gameInfo, gameStartInfo]);

  useEffect(() => {
    if (socket === null) return;
    if (ref.current === null) return;

    document.addEventListener("keyup", function (event) {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        sendMoveBar(socket, {
          type: "keyup",
          key: event.key,
        });
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        sendMoveBar(socket, {
          type: "keydown",
          key: event.key,
        });
      }
    });
  }, []);

  return (
    <GameBoard>
      <canvas
        ref={ref}
        id="pongCanvas"
        width={gameStartInfo?.canvasWidth}
        height={gameStartInfo?.canvasHeight}
        className="w-full h-full z-[999]"
      />
    </GameBoard>
  );
}
