import FlexBox from "@/layouts/FlexBox";
import { NotiChannelInvite } from "@/socket/notification";
import ChipButton from "../button/ChipButton";
import { useNoti } from "@/hooks/data/useNoti";
import { acceptInvite, rejectInvite } from "@/api/channels/operate";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface ChannelInviteAlarmProps {
  noti: NotiChannelInvite;
  idx: number;
}

export default function ChannelInviteAlarm({
  noti,
  idx,
}: ChannelInviteAlarmProps) {
  const router = useRouter();
  const { removeNoti } = useNoti();
  const acceptClick = async () => {
    try {
      console.log("acceptClick");
      await acceptInvite(noti.channel.id);
      removeNoti(idx);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response?.status === 401) {
        router.push("/login");
        return;
      }
      if (typeof axiosError.response?.data.message === "object")
        toast.error(axiosError.response?.data.message[0]);
      else toast.error(axiosError.response?.data.message);
      removeNoti(idx);
    }
  };
  const rejectClick = async () => {
    console.log("rejectClick");
    removeNoti(idx);
    await rejectInvite(noti.channel.id);
  };
  return (
    <FlexBox className="w-full h-fit justify-between">
      <div>
        채널 <span className="text-lightblue-cyber">{noti.channel.title}</span>
        에 초대되었습니다!
      </div>
      <FlexBox className="w-fit h-fit gap-3">
        <ChipButton color="green" className="text-xs" onClick={acceptClick}>
          수락
        </ChipButton>
        <ChipButton color="red" className="text-xs" onClick={rejectClick}>
          거절
        </ChipButton>
      </FlexBox>
    </FlexBox>
  );
}
