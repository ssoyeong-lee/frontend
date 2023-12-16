import { UserAbstract } from "@/api/users/index";
import { atom, useAtom } from "jotai";

interface GameStart extends GameInfo {
  me: GameUserInfo & { info: UserAbstract };
  opponent: GameUserInfo & { info: UserAbstract };
  canvasHeight: number;
  canvasWidth: number;
  barHeight: number;
  barWidth: number;
}

interface GameResult {
  id: number;
  result: "win" | "lose";
  lpChange: number;
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
  opponent: GameUserInfo;
  ball: GameBallInfo;
}

interface GameSearch {
  isSearching: boolean;
  mode: "standard" | "extreme";
}

const gameInfoAtom = atom<GameInfo | null>(null);
const gameStartInfoAtom = atom<GameStart | null>(null);
const gameSearchAtom = atom<GameSearch>({
  isSearching: false,
  mode: "standard",
});

interface UseGameType {
  gameSearch: GameSearch;
  setGameSearch: (gameSearch: GameSearch) => void;
  gameInfo: GameInfo | null;
  setGameInfo: (gameInfo: GameInfo) => void;
  gameStartInfo: GameStart | null;
  setGameStartInfo: (gameStartInfo: GameStart) => void;
}

function useGame(): UseGameType {
  const [gameInfo, setGameInfoAtom] = useAtom(gameInfoAtom);
  const [gameStartInfo, setGameStartInfoAtom] = useAtom(gameStartInfoAtom);
  const [gameSearch, setGameSearchAtom] = useAtom(gameSearchAtom);

  const setGameInfo = (_gameInfo: GameInfo) => {
    setGameInfoAtom(_gameInfo);
  };
  const setGameStartInfo = (_gameStartInfo: GameStart) => {
    setGameStartInfoAtom(_gameStartInfo);
  };
  const setGameSearch = (_gameSearch: GameSearch) => {
    setGameSearchAtom(_gameSearch);
  };

  return {
    gameInfo,
    setGameInfo,
    gameStartInfo,
    setGameStartInfo,
    gameSearch,
    setGameSearch,
  };
}

export { useGame };
export type { GameStart, GameResult, GameUserInfo, GameBallInfo, GameInfo };
