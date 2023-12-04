import { UserAbstract, getUserList } from "@/api/users";
import ChatCard from "@/card/chat/ChatCard";
import ListCard from "@/card/chat/ListCard";
import SearchCard from "@/card/user/SearchCard";
import Container from "@/layouts/Container";
import FlexBox from "@/layouts/FlexBox";
import TopNav from "@/layouts/TopNav";
import { useEffect, useState } from "react";

export default function Chat() {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [userList, setUserList] = useState<UserAbstract[]>([]);

  useEffect(() => {
    const getData = async () => {
      const tmp = (await getUserList()).data;
      setUserList(tmp);
    };
    getData();
  }, []);
  return (
    <div className="w-full h-full" onClick={() => setIsSearch(false)}>
      <TopNav />
      <Container>
        <FlexBox className="h-full w-full gap-6">
          {isSearch === true ? (
            <SearchCard
              type="chat"
              userList={userList}
              isSearch={isSearch}
              setIsSearch={setIsSearch}
            />
          ) : (
            <>
              <div className="basis-1/3 h-full">
                <ListCard />
              </div>
              <div className="basis-2/3 h-full">
                <ChatCard setIsSearch={setIsSearch}/>
              </div>
            </>
          )}
        </FlexBox>
      </Container>
    </div>
  );
}
