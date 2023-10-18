import { useEffect, useState } from "react";

interface Props{
    who?: "me" | "opponent";
    where?: number;
}

export default function PlayerBar({who, where}: Props){
    let barStyle = {
        left: `${where}px`,
    };
    return (
        <div style={barStyle} className={`absolute z-99 w-1/4 h-[20px] bg-white
            ${who === "me" ? "bottom-0 mb-4 drop-shadow-red" : "top-0 mt-4 drop-shadow-blue"}`}></div>
    );
}