import ChatCard from "@/card/chat/ChatCard";
import ListCard from "@/card/chat/ListCard";
import Container from "@/layouts/Container";
import FlexBox from "@/layouts/FlexBox";
import TopNav from "@/layouts/TopNav";

export default function Chat() {
  return (
    <>
      <TopNav />
      <Container>
        <FlexBox className="w-full gap-6">
          <div className="basis-1/3 h-full">
            <ListCard />
          </div>
          <div className="basis-2/3 h-full">
            <ChatCard />
          </div>
        </FlexBox>
      </Container>
    </>
  );
}
