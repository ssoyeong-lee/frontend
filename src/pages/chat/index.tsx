import { UserAbstract, getUserList } from "@/api/users";
import ChatCard from "@/card/chat/ChatCard";
import ListCard from "@/card/chat/ListCard";
import SearchCard from "@/card/chat/SearchCard";
import Container from "@/layouts/Container";
import FlexBox from "@/layouts/FlexBox";
import TopNav from "@/layouts/TopNav";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Chat() {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [userList, setUserList] = useState<UserAbstract[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const tmp = (await getUserList()).data;
        setUserList(tmp);
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        if (typeof axiosError.response?.data.message === "object")
          toast.error(axiosError.response?.data.message[0]);
        else toast.error(axiosError.response?.data.message);
      }
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
                <ChatCard setIsSearch={setIsSearch} />
              </div>
            </>
          )}
        </FlexBox>
      </Container>
    </div>
  );
}
