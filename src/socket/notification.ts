import socket from "@/socket/index";

type NotificationType = "game-invite" | "channel_invite" | "friend-request";
interface Notification<T extends NotificationType> {
  type: T;
}

interface NotiGameInvite extends Notification<"game-invite"> {
  invitingUser: {
    id: number; // userId
    nickname: string;
  };
}

interface NotiChannelInvite extends Notification<"channel_invite"> {
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
  callbackGameInvite: (res: NotiGameInvite) => void,
  callbackChannelInvite: (res: NotiChannelInvite) => void,
  callbackFriendRequest: (res: NotiFriendRequest) => void
) {
  socket.on("noti", (data: { type: NotificationType }) => {
    if (data.type === "game-invite") {
      callbackGameInvite(data as NotiGameInvite);
    } else if (data.type === "channel_invite") {
      callbackChannelInvite(data as NotiChannelInvite);
    } else if (data.type === "friend-request") {
      callbackFriendRequest(data as NotiFriendRequest);
    }
  });
}

export { receiveNotification };
