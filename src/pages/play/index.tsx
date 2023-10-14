import HowToPlayCard from "@/card/play/HowToPlayCard";
import OptionCard from "@/card/play/OptionCard";
import QueueCard from "@/card/play/QueueCard";
import GameLoader from "@/components/GameLoader";
import GameButton from "@/components/button/GameButton";
import Container from "@/layouts/Container";
import FlexBox from "@/layouts/FlexBox";
import TopNav from "@/layouts/TopNav";

export default function Play() {
  return (
    <>
      <TopNav />
      <Container>
        <FlexBox className="w-full gap-6">
          <div className="basis-1/3 h-full">
            <HowToPlayCard />
          </div>
          <FlexBox className="basis-2/3 h-full gap-6" direction="col">
            <OptionCard />
            <QueueCard queue={1} game={2} />
            <GameButton isFinding={false} />
            <GameLoader isFinding={true} />
          </FlexBox>
        </FlexBox>
      </Container>
    </>
  );
}
