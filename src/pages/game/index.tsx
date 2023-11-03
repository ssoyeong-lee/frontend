import GameBoard from "@/layouts/Gameboard";
import PlayerBar from "@/layouts/PlayerBar";
import { useEffect, useState } from "react";

let direction: "none" | "left" | "right" = "none";
let run: true | false = false;
export default function Game() {
  const [myPos, setMyPos] = useState(0);

  const speed = 3;
  const asyncMv = async () => {
    while (run == true && direction !== "none") {
      if (direction === "left") {
        setMyPos((prev) => {
          console.log(prev);
          if (prev <= 0) return 0;
          else return prev - speed;
        });
      } else {
        setMyPos((prev) => {
          console.log(prev);
          if (prev >= 75) return 75;
          else return prev + speed;
        });
      }
      await sleep(30);
    }
  };

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const startMoving = (e: KeyboardEvent) => {
    console.log(e.key);
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      direction = e.key === "ArrowLeft" ? "left" : "right";
      if (run == false) {
        run = true;
        asyncMv();
      }
    }
  };
  const stopMoving = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      direction = "none";
      run = false;
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
