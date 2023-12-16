import { GameUserInfo } from "@/hooks/data/useGame";

interface Props {
  who?: "me" | "opponent";
  info?: GameUserInfo;
}

export default function PlayerBar({ who, info }: Props) {
  let barStyle = {
    left: `${info?.bar.x}%`,
  };
  return (
    <div
      className={`absolute w-full h-[20px] z-99 ${
        who === "me"
          ? "bottom-0 mb-4 drop-shadow-red"
          : "top-0 mt-4 drop-shadow-blue"
      }`}
    >
      <div
        style={barStyle}
        className={`absolute w-1/4 h-full bg-white
            `}
      ></div>
    </div>
  );
}
