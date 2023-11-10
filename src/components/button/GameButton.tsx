import { Dispatch, SetStateAction } from "react";

interface GameButtonProps {
  onClick?: () => void;
  isFinding: boolean;
}

export default function GameButton({ onClick, isFinding }: GameButtonProps) {
  let buttonClass = "text-black bg-lightblue-cyber";
  if (isFinding) buttonClass = "text-white bg-deepblue-cyber";

  return (
    <button
      className={`w-full p-6 text-4xl font-bold ${buttonClass}`}
      onClick={onClick}
    >
      {isFinding ? "Cancel" : "Enter Matchmaking"}
    </button>
  );
}
