import ChannelInviteAlarm from "@/components/alarm/ChannelInviteAlarm";
import FriendRequestAlarm from "@/components/alarm/FriendRequestAlarm";
import GameInviteAlarm from "@/components/alarm/GameInviteAlarm";
import {
  NotiChannelInvite,
  NotiFriendRequest,
  NotiGameInvite,
  Notification,
  NotificationType,
} from "@/socket/notification";

interface AlarmProps {
  noti: Notification<NotificationType>;
  idx: number;
}
export default function Alarm({ noti, idx }: AlarmProps) {
  switch (noti.type) {
    case "game-invite":
      return <GameInviteAlarm noti={noti as NotiGameInvite} idx={idx} />;
    case "channel-invite":
      return <ChannelInviteAlarm noti={noti as NotiChannelInvite} idx={idx} />;
    case "friend-request":
      return <FriendRequestAlarm noti={noti as NotiFriendRequest} idx={idx} />;
    default:
      return <></>;
  }
}
