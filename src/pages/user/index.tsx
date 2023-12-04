import { Block, getBlockList } from "@/api/users/block";
import { Friend, getFriendRelationList } from "@/api/users/friend";
import { UserAbstract, getUserList } from "@/api/users/index";
import BlockCard from "@/card/user/BlockCard";
import FriendCard from "@/card/user/FriendCard";
import RankingCard from "@/card/user/RankingCard";
import SearchCard from "@/card/user/SearchCard";
import Container from "@/layouts/Container";
import FlexBox from "@/layouts/FlexBox";
import TopNav from "@/layouts/TopNav";
import { useEffect, useState } from "react";
import sleep from "@/utils/sleep";

export default function User() {
  const [userList, setUserList] = useState<UserAbstract[]>([]);
  const [friendList, setFriendList] = useState<Friend[]>([]);
  const [blockList, setBlockList] = useState<Block[]>([]);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    const asyncFunc = async () => {
      const res = await getUserList();
      setUserList(res.data);
    };
    asyncFunc();
  }, []);

  useEffect(() => {
    const asyncFunc = async () => {
      await sleep(100);
      Promise.all([getFriendRelationList(), getBlockList()]).then((res) => {
        setFriendList(res[0].data);
        setBlockList(res[1].data);
      });
    };
    if (isSearch === false) asyncFunc();
  }, [isSearch]);
  return (
    <div className="w-full h-full" onClick={() => setIsSearch(false)}>
      <TopNav />
      <Container>
        <div className="w-full h-full" onClick={(e) => e.stopPropagation()}>
          {isSearch ? (
            <SearchCard
              type="user"
              userList={userList}
              isSearch={isSearch}
              setIsSearch={setIsSearch}
            />
          ) : (
            <FlexBox className="h-full w-full gap-6">
              <FlexBox className="basis-1/3 h-full gap-6" direction="col">
                <div className="w-full h-fit">
                  <SearchCard type="user" onClick={() => setIsSearch(true)} />
                </div>
                <RankingCard userList={userList} />
              </FlexBox>
              <div className="basis-1/3 h-full">
                <FriendCard
                  friendList={friendList}
                  setFriendList={setFriendList}
                />
              </div>
              <div className="basis-1/3 h-full">
                <BlockCard blockList={blockList} setBlockList={setBlockList} />
              </div>
            </FlexBox>
          )}
        </div>
      </Container>
    </div>
  );
}
