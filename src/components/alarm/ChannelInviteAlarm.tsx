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
        <span>{noti.invitingUser.nickname}</span>
        <span>님이 채널 초대를 보냈습니다.</span>
      </div>
    </FlexBox>
  );
}
