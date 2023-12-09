import { enterQueue, leaveQueue } from "@/api/games/index";
import HowToPlayCard from "@/card/play/HowToPlayCard";
import OptionCard from "@/card/play/OptionCard";
import GameLoader from "@/components/GameLoader";
import GameButton from "@/components/button/GameButton";
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
  const [isFinding, setIsFinding] = useState(false);
  const [option, setOption] = useState<Option>({
    speed: "normal",
    mode: "standard",
  });
  const onClick = async () => {
    try {
      if (isFinding) {
        await leaveQueue();
      } else {
        await enterQueue();
      }
      setIsFinding((prev) => !prev);
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
            <GameButton isFinding={isFinding} onClick={onClick} />
            {isFinding && <GameLoader />}
          </FlexBox>
        </FlexBox>
      </Container>
    </>
  );
}
