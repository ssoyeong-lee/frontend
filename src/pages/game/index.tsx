import GameBoard from "@/layouts/Gameboard";
import PlayerBar from "@/layouts/PlayerBar";
import { useEffect, useState } from "react";

let direction: "none" | "left" | "right" = "none";

export default function Game() {
  const [myPos, setMyPos] = useState(0);

  const asyncMv = async () => {
    while (direction !== "none") {
      if (direction === "left") {
        setMyPos((prev) => {
          console.log(prev);
          if (prev <= 0) return 0;
          else return prev - 1;
        });
      } else {
        setMyPos((prev) => {
          console.log(prev);
          if (prev >= 75) return 75;
          else return prev + 1;
        });
      }
      await sleep(30);
    }
  };

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const startMoving = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      direction = e.key === "ArrowLeft" ? "left" : "right";
      asyncMv();
    }
  };
  const stopMoving = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      direction = "none";
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", startMoving);
    window.addEventListener("keyup", stopMoving);
    return () => {
      window.removeEventListener("keydown", startMoving);
      window.removeEventListener("keyup", stopMoving);
    };
  }, []);

  return (
    <GameBoard>
      <PlayerBar who="me" where={myPos} />
      <PlayerBar who="opponent" />
    </GameBoard>
  );
}
