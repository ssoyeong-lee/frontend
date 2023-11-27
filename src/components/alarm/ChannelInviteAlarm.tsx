import { NotiChannelInvite } from "@/socket/notification";

interface ChannelInviteAlarmProps {
  noti: NotiChannelInvite;
}

export default function ChannelInviteAlarm({ noti }: ChannelInviteAlarmProps) {
  return (
    <div>
      <span>{noti.invitingUser.nickname}</span>
      <span>님이 채널 초대를 보냈습니다.</span>
    </div>
  );
}
