import FlexBox from "@/layouts/FlexBox";
import { NotiChannelInvite } from "@/socket/notification";
import ChipButton from "../button/ChipButton";
import { useNoti } from "@/hooks/data/useNoti";
import { acceptInvite, rejectInvite } from "@/api/channels/operate";

interface ChannelInviteAlarmProps {
  noti: NotiChannelInvite;
  idx: number;
}

export default function ChannelInviteAlarm({
  noti,
  idx,
}: ChannelInviteAlarmProps) {
  const { removeNoti } = useNoti();
  const acceptClick = async () => {
    console.log("acceptClick");
    removeNoti(idx);
    await acceptInvite(noti.channel.id);
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
