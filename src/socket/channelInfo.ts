import socket from "@/socket/index";

function ChannelIn(
  callback: (res: { channelId: string; userId: string }) => void
) {
  socket.on("channel-in", (res: { channelId: string; userId: string }) =>
    callback(res)
  );
}

function ChannelOut(
  callback: (res: { channelId: string; kickedUserId: string }) => void
) {
  socket.on(
    "channel-out",
    (res: { channelId: string; kickedUserId: string }) => {
      callback(res);
    }
  );
}

interface Member {
  userId: string;
  isAdmin?: boolean;
  isOwner?: boolean;
  isMuted?: boolean;
}

function ChannelMember(callback: (res: Member[]) => void) {
  socket.on("channel-member", (res: Member[]) => {
    callback(res);
  });
}

export { ChannelIn, ChannelOut, ChannelMember };
