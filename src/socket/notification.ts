import socket from "@/socket/index";

function notiGameInvite(callback: (res: { opponentId: string }) => void) {
  socket.on("noti-game-invite", (res: { opponentId: string }) => callback(res));
}

function notiChannelInvite(
  callback: (res: { channelId: string; inviterId: string }) => void
) {
  socket.on(
    "noti-channel-invite",
    (res: { channelId: string; inviterId: string }) => callback(res)
  );
}

function notiFriendRequest(callback: (res: { otherUserId: string }) => void) {
  socket.on("noti-friend-request", (res: { otherUserId: string }) =>
    callback(res)
  );
}

export { notiGameInvite, notiChannelInvite, notiFriendRequest };
