import FlexBox from "@/layouts/FlexBox";
import { NotiGameInvite } from "@/socket/notification";

interface GameInviteAlarmProps {
  noti: NotiGameInvite;
  idx: number;
}

export default function GameInviteAlarm({ noti, idx }: GameInviteAlarmProps) {
  return (
    <FlexBox className="justify-between">
      <div>
        <span>{noti.invitingUser.nickname}</span>
        <span>님이 게임에 초대했습니다.</span>
      </div>
    </FlexBox>
  );
}
