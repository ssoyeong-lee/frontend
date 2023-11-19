import { Socket } from "socket.io-client";

function ChannelIn(
  socket: Socket,
  callback: (res: { channelId: string; userId: string }) => void
) {
  socket.on("channel-in", (res: { channelId: string; userId: string }) =>
    callback(res)
  );
}

function ChannelOut(
  socket: Socket,
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

function ChannelMember(socket: Socket, callback: (res: Member[]) => void) {
  socket.on("channel-member", (res: Member[]) => {
    callback(res);
  });
}

export { ChannelIn, ChannelOut, ChannelMember };
export type { Member };
