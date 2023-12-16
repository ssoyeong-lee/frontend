import { UserDetail, getUserMe } from "@/api/users/index";
import HistoryCard from "@/card/main/HistoryCard";
import ProfileCard from "@/card/main/ProfileCard";
import StatusCard from "@/card/main/StatusCard";
import { useAuth } from "@/hooks/data/useAuth";
import Container from "@/layouts/Container";
import FlexBox from "@/layouts/FlexBox";
import TopNav from "@/layouts/TopNav";
import { useEffect, useState } from "react";

export default function Home() {
  const { auth, setAuth } = useAuth();
  const [user, setUser] = useState<UserDetail | null>(null);

  useEffect(() => {
    getUserMe()
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (auth !== null && user === null) {
      setUser(auth);
    }
  }, [auth]);

  useEffect(() => {
    if (user !== auth && user !== null && auth !== null) {
      setAuth(user);
    }
  }, [user]);

  return (
    <>
      <TopNav />
      <Container>
        <FlexBox className="w-full h-full gap-6" direction="col">
          <FlexBox className="w-full h-[340px] gap-6">
            <div className="basis-1/3 h-full">
              <ProfileCard type="me" user={user} setUser={setUser} />
            </div>
            <div className="basis-2/3 h-full">
              <StatusCard user={user} />
            </div>
          </FlexBox>
          <div className="w-full h-full max-h-[calc(100%-340px-24px)]">
            <HistoryCard user={user} />
          </div>
        </FlexBox>
      </Container>
    </>
  );
}
