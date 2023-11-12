import { Block, getBlockList } from "@/api/users/block";
import { Friend, getFriendList } from "@/api/users/friend";
import { UserAbstract, getUserList } from "@/api/users/index";
import BlockCard from "@/card/user/BlockCard";
import FriendCard from "@/card/user/FriendCard";
import RankingCard from "@/card/user/RankingCard";
import SearchCard from "@/card/user/SearchCard";
import Container from "@/layouts/Container";
import FlexBox from "@/layouts/FlexBox";
import TopNav from "@/layouts/TopNav";
import { useEffect, useState } from "react";

export default function User() {
  const [userList, setUserList] = useState<UserAbstract[]>([]);
  const [friendList, setFriendList] = useState<Friend[]>([]);
  const [blockList, setBlockList] = useState<Block[]>([]);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    const asyncFunc = async () => {
      Promise.all([getUserList(), getFriendList(), getBlockList()]).then(
        (res) => {
          setUserList(res[0].data);
          setFriendList(res[1].data);
          setBlockList(res[2].data);
        }
      );
    };
    asyncFunc();
  }, []);
  return (
    <div className="w-full h-full" onClick={() => setIsSearch(false)}>
      <TopNav />
      <Container>
        <div className="w-full h-full" onClick={(e) => e.stopPropagation()}>
          {isSearch ? (
            <SearchCard userList={userList} isSearch={isSearch} />
          ) : (
            <FlexBox className="h-full w-full gap-6">
              <FlexBox className="basis-1/3 h-full gap-6" direction="col">
                <div className="w-full h-fit">
                  <SearchCard onClick={() => setIsSearch(true)} />
                </div>
                <RankingCard userList={userList} />
              </FlexBox>
              <div className="basis-1/3 h-full">
                <FriendCard friendList={friendList} />
              </div>
              <div className="basis-1/3 h-full">
                <BlockCard blockList={blockList} />
              </div>
            </FlexBox>
          )}
        </div>
      </Container>
    </div>
  );
}
