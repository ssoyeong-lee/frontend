import { UserDetail, getUser } from "@/api/users";
import HistoryCard from "@/card/main/HistoryCard";
import ProfileCard from "@/card/main/ProfileCard";
import StatusCard from "@/card/main/StatusCard";
import Container from "@/layouts/Container";
import FlexBox from "@/layouts/FlexBox";
import TopNav from "@/layouts/TopNav";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<UserDetail | null>(null);
  useEffect(() => {
    const getData = async () => {
      if (
        router === undefined ||
        router.query === undefined ||
        router.query.id === undefined
      )
        return;
      const id = parseInt(router.query.id.toString());
      try {
        const ret = await getUser(id);
        setUser(ret.data);
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        if (typeof axiosError.response?.data.message === "object")
          toast.error(axiosError.response?.data.message[0]);
        else toast.error(axiosError.response?.data.message);
      }
    };
    getData();
  }, [router.isReady]);
  return (
    <>
      <TopNav />
      <Container>
        <FlexBox className="w-full h-full gap-6" direction="col">
          <FlexBox className="w-full h-[340px] gap-6">
            <div className="basis-1/3 h-full">
              <ProfileCard type="other" user={user} />
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
