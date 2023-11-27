import ChannelInviteToast from "@/components/toast/ChannelInviteToast";
import FriendRequestToast from "@/components/toast/FriendRequestToast";
import GameInviteToast from "@/components/toast/GameInviteToast";
import {
  NotiChannelInvite,
  NotiFriendRequest,
  NotiGameInvite,
  Notification,
  NotificationType,
} from "@/socket/notification";

interface ToastProps {
  noti: Notification<NotificationType>;
}
export default function Toast({ noti }: ToastProps) {
  switch (noti.type) {
    case "game-invite":
      return <GameInviteToast noti={noti as NotiGameInvite} />;
    case "channel-invite":
      return <ChannelInviteToast noti={noti as NotiChannelInvite} />;
    case "friend-request":
      return <FriendRequestToast noti={noti as NotiFriendRequest} />;
    default:
      return <></>;
  }
}
