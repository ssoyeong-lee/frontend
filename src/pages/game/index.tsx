import { useGame } from "@/hooks/data/useGame";
import { useModal } from "@/hooks/display/useModal";
import { useSocket } from "@/hooks/useSocket";
import GameBoard from "@/layouts/Gameboard";
import { sendMoveBar } from "@/socket/game";
import { draw } from "@/utils/draw";
import { useEffect, useRef } from "react";

export default function Game() {
  const { socket } = useSocket();
  const { gameInfo } = useGame();
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (gameInfo === null) return;
    if (ref.current === null) return;
    const curCtx = ref.current.getContext("2d");
    if (curCtx === null) return;
    draw(curCtx, 100, 200, gameInfo);
  }, [gameInfo]);

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
        width="100"
        height="200"
        className="w-full h-full z-[999]"
      />
    </GameBoard>
  );
}
