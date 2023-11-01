import { useEffect, useState } from "react";

interface Props {
  who?: "me" | "opponent";
  where?: number;
}

export default function PlayerBar({ who, where }: Props) {
  let barStyle = {
    left: `${where}%`,
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
