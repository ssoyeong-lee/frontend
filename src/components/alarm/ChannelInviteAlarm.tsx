import FlexBox from "@/layouts/FlexBox";
import { NotiChannelInvite } from "@/socket/notification";

interface ChannelInviteAlarmProps {
  noti: NotiChannelInvite;
  idx: number;
}

export default function ChannelInviteAlarm({
  noti,
  idx,
}: ChannelInviteAlarmProps) {
  return (
    <FlexBox className="justify-between">
      <div>
        채널 <span>{noti.channel.title}</span>에 초대되었습니다!
      </div>
    </FlexBox>
  );
}
