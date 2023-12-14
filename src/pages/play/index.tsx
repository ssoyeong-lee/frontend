import { enterQueue, leaveQueue } from "@/api/games/index";
import HowToPlayCard from "@/card/play/HowToPlayCard";
import OptionCard from "@/card/play/OptionCard";
import GameLoader from "@/components/GameLoader";
import GameButton from "@/components/button/GameButton";
import { useGame } from "@/hooks/data/useGame";
import Container from "@/layouts/Container";
import FlexBox from "@/layouts/FlexBox";
import TopNav from "@/layouts/TopNav";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface Option {
  mode: "standard" | "extreme";
}

export default function Play() {
  const { gameSearch, setGameSearch } = useGame();
  const onClick = async () => {
    try {
      if (gameSearch.isSearching) {
        setGameSearch({
          ...gameSearch,
          isSearching: false,
        });
        await leaveQueue();
      } else {
        setGameSearch({
          ...gameSearch,
          isSearching: true,
        });
        await enterQueue(gameSearch.mode);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.status);
    }
  };

  return (
    <>
      <TopNav />
      <Container>
        <FlexBox className="h-full w-full gap-6">
          <div className="basis-1/3 h-full">
            <HowToPlayCard />
          </div>
          <FlexBox className="basis-2/3 h-full gap-6" direction="col">
            <div className="h-fit w-full">
              <OptionCard />
            </div>
            <GameButton isFinding={gameSearch.isSearching} onClick={onClick} />
            {gameSearch.isSearching && <GameLoader />}
          </FlexBox>
        </FlexBox>
      </Container>
    </>
  );
}
