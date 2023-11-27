import { Socket } from "socket.io-client";

export type NotificationType =
  | "game-invite"
  | "channel-invite"
  | "friend-request";
interface Notification<T extends NotificationType> {
  type: T;
}

interface NotiGameInvite extends Notification<"game-invite"> {
  invitingUser: {
    id: number; // userId
    nickname: string;
  };
}

interface NotiChannelInvite extends Notification<"channel-invite"> {
  channelId: number; // channelId
  invitingUser: {
    id: number; // userId
    nickname: string;
  };
}

interface NotiFriendRequest extends Notification<"friend-request"> {
  requestingUser: {
    id: number; // userId
    nickname: string;
  };
}

function receiveNotification(
  socket: Socket,
  setNoti: (noti: Notification<NotificationType>) => void
) {
  socket.on("noti", (data: { type: NotificationType }) => {
    console.log(data);
    setNoti(data);
  });
}

export { receiveNotification };

export type {
  Notification,
  NotiGameInvite,
  NotiChannelInvite,
  NotiFriendRequest,
};
