import { UserDetail, getUserMe } from "@/api/users/index";
import HistoryCard from "@/card/main/HistoryCard";
import ProfileCard from "@/card/main/ProfileCard";
import StatusCard from "@/card/main/StatusCard";
import Container from "@/layouts/Container";
import FlexBox from "@/layouts/FlexBox";
import TopNav from "@/layouts/TopNav";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [user, setUser] = useState<UserDetail | null>(null);
  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const res = await getUserMe();
        setUser(res.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        toast.error(axiosError.response?.status);
      }
    };
    asyncFunc();
  }, []);

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
