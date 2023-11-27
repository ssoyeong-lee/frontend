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
}
export default function Alarm({ noti }: AlarmProps) {
  switch (noti.type) {
    case "game-invite":
      return <GameInviteAlarm noti={noti as NotiGameInvite} />;
    case "channel-invite":
      return <ChannelInviteAlarm noti={noti as NotiChannelInvite} />;
    case "friend-request":
      return <FriendRequestAlarm noti={noti as NotiFriendRequest} />;
    default:
      return <></>;
  }
}
