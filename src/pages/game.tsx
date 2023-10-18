import GameBoard from "@/layouts/Gameboard";
import PlayerBar from "@/layouts/PlayerBar";
import { useEffect, useState } from "react";

export default function Game() {
  const [myPos, setMyPos] = useState(100);

  const mvMyBar = (e: KeyboardEvent) => {
    const step = 30;
    if (e.key === "ArrowLeft") {
      if (myPos < step) setMyPos(0);
      else setMyPos(myPos - step);
    } else if (e.key === "ArrowRight") {
      if (myPos > 640 - step) setMyPos(640);
      else setMyPos(myPos + step);
    }
    console.log("event occured: ", myPos);
  };

  useEffect(() => {
    window.addEventListener("keydown", mvMyBar);
    return () => {
      window.removeEventListener("keydown", mvMyBar);
    };
  }, [myPos]);

  return (
    <GameBoard>
      <PlayerBar who="me" where={myPos} />
      <PlayerBar who="opponent" />
    </GameBoard>
  );
}
