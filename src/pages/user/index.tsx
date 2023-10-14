import BansCard from "@/card/user/BansCard";
import FriendsCard from "@/card/user/FriendsCard";
import RankingCard from "@/card/user/RankingCard";
import SearchCard from "@/card/user/SearchCard";
import Container from "@/layouts/Container";
import FlexBox from "@/layouts/FlexBox";
import TopNav from "@/layouts/TopNav";

export default function User() {
  return (
    <>
      <TopNav />
      <Container>
        <FlexBox className="w-full gap-6">
          <FlexBox className="basis-1/3 h-full gap-6" direction="col">
            <SearchCard />
            <RankingCard />
          </FlexBox>
          <div className="basis-1/3 h-full">
            <FriendsCard />
          </div>
          <div className="basis-1/3 h-full">
            <BansCard />
          </div>
        </FlexBox>
      </Container>
    </>
  );
}
