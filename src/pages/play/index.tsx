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
import { useState } from "react";
import { toast } from "react-toastify";

export interface Option {
  speed: "normal" | "fast";
  mode: "standard" | "extreme";
}

export default function Play() {
  const { isGameSearching, setIsGameSearching } = useGame();
  const [option, setOption] = useState<Option>({
    speed: "normal",
    mode: "standard",
  });
  const onClick = async () => {
    try {
      if (isGameSearching) {
        await leaveQueue();
        setIsGameSearching(false);
      } else {
        await enterQueue();
        setIsGameSearching(true);
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
              <OptionCard option={option} setOption={setOption} />
            </div>
            <GameButton isFinding={isGameSearching} onClick={onClick} />
            {isGameSearching && <GameLoader />}
          </FlexBox>
        </FlexBox>
      </Container>
    </>
  );
}
