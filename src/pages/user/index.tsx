import BansCard from "@/card/user/BansCard";
import FriendsCard from "@/card/user/FriendsCard";
import RankingCard from "@/card/user/RankingCard";
import SearchCard from "@/card/user/SearchCard";
import Container from "@/layouts/Container";
import FlexBox from "@/layouts/FlexBox";
import TopNav from "@/layouts/TopNav";
import { useState } from "react";

export default function User() {
  const [isSearch, setIsSearch] = useState(false);
  return (
    <div className="w-full h-full" onClick={() => setIsSearch(false)}>
      <TopNav />
      <Container>
        <div className="w-full h-full" onClick={(e) => e.stopPropagation()}>
          {isSearch ? (
            <SearchCard isSearch={isSearch} />
          ) : (
            <FlexBox className="h-full w-full gap-6">
              <FlexBox className="basis-1/3 h-full gap-6" direction="col">
                <div className="w-full h-fit">
                  <SearchCard onClick={() => setIsSearch(true)} />
                </div>
                <RankingCard />
              </FlexBox>
              <div className="basis-1/3 h-full">
                <FriendsCard />
              </div>
              <div className="basis-1/3 h-full">
                <BansCard />
              </div>
            </FlexBox>
          )}
        </div>
      </Container>
    </div>
  );
}
