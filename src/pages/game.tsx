import GameBoard from "@/layouts/Gameboard";
import PlayerBar from "@/layouts/PlayerBar";

export default function Game(){
    return (
        <GameBoard>
            <PlayerBar who="me"/>
            <PlayerBar who="opponent"/>
        </GameBoard>
    );
}