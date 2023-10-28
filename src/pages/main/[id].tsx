import HistoryCard from "@/card/main/HistoryCard";
import ProfileCard from "@/card/main/ProfileCard";
import StatusCard from "@/card/main/StatusCard";
import Container from "@/layouts/Container";
import FlexBox from "@/layouts/FlexBox";
import TopNav from "@/layouts/TopNav";

export default function Home() {
  return (
    <>
      <TopNav />
      <Container>
        <FlexBox className="w-full gap-6" direction="col">
          <FlexBox className="w-full h-[350px] gap-6">
            <div className="basis-1/3 h-full">
              <ProfileCard />
            </div>
            <div className="basis-2/3 h-full">
              <StatusCard />
            </div>
          </FlexBox>
          <div className="w-full">
            <HistoryCard />
          </div>
        </FlexBox>
      </Container>
    </>
  );
}
