interface Props{
    who?: "me" | "opponent";
    where?: number;
}

export default function PlayerBar({who}: Props){
    return (
        <div className={`absolute z-99 left-[50px] w-1/4 h-[20px] bg-white
            ${who === "me" ? "bottom-0 mb-4 drop-shadow-red" : "top-0 mt-4 drop-shadow-blue"}`}></div>
    );
}