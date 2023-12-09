import { UserAbstract } from "@/api/users/index";
import { atom, useAtom } from "jotai";

interface GameStart extends GameInfo {
  me: GameUserInfo & { info: UserAbstract };
  oppense: GameUserInfo & { info: UserAbstract };
}

interface GameResult {
  id: number;
  result: "win" | "lose";
  lpchange: number;
  user: UserAbstract;
  opponent: UserAbstract;
  userScore: number;
  opponentScore: number;
  playedAt: string;
}

interface GameUserInfo {
  score: number;
  bar: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

interface GameBallInfo {
  radius: number;
  x: number;
  y: number;
}

interface GameInfo {
  me: GameUserInfo;
  oppense: GameUserInfo;
  ball: GameBallInfo;
}

const gameInfoAtom = atom<GameInfo | null>(null);
const gameStartInfoAtom = atom<GameStart | null>(null);

interface UseGameType {
  gameInfo: GameInfo | null;
  setGameInfo: (gameInfo: GameInfo) => void;
  gameStartInfo: GameStart | null;
  setGameStartInfo: (gameStartInfo: GameStart) => void;
}

function useGame(): UseGameType {
  const [gameInfo, setGameInfoAtom] = useAtom(gameInfoAtom);
  const [gameStartInfo, setGameStartInfoAtom] = useAtom(gameStartInfoAtom);

  const setGameInfo = (gameInfo: GameInfo) => {
    setGameInfoAtom(gameInfo);
  };
  const setGameStartInfo = (gameStartInfo: GameStart) => {
    setGameStartInfoAtom(gameStartInfo);
  };

  return {
    gameInfo,
    setGameInfo,
    gameStartInfo,
    setGameStartInfo,
  };
}

export { useGame };
export type { GameStart, GameResult, GameUserInfo, GameBallInfo, GameInfo };
