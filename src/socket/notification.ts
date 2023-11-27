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
  setNoti: (res: Notification<NotificationType>) => void
) {
  socket.on("noti", (res: { type: NotificationType }) => {
    console.log(res);
    setNoti(res);
  });
}

function receiveNotificationList(
  socket: Socket,
  setNotiList: (notiList: Notification<NotificationType>[]) => void
) {
  socket.emit("noti-unread", (res: Notification<NotificationType>[]) => {
    console.log(res);
    setNotiList(res);
  });
}

export { receiveNotification, receiveNotificationList };

export type {
  Notification,
  NotiGameInvite,
  NotiChannelInvite,
  NotiFriendRequest,
};
