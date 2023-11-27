import { NotiGameInvite } from "@/socket/notification";

interface GameInviteAlarmProps {
  noti: NotiGameInvite;
}

export default function GameInviteAlarm({ noti }: GameInviteAlarmProps) {
  return (
    <div>
      <span>{noti.invitingUser.nickname}</span>
      <span>님이 게임에 초대했습니다.</span>
    </div>
  );
}
