import { NotiGameInvite } from "@/socket/notification";

interface GameInviteToastProps {
  noti: NotiGameInvite;
}

export default function GameInviteToast({ noti }: GameInviteToastProps) {
  return (
    <div>
      <span>{noti.invitingUser.nickname}</span>
      <span>님이 게임에 초대했습니다.</span>
    </div>
  );
}
