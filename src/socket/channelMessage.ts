import { Socket } from "socket.io-client";

interface CM {
  channel: { id: number };
  sender: { id: number; nickname: string };
  receiver: { id: number; nickname: string };
  content: string;
  createdAt: string;
}

function receiveCM(socket: Socket, callback: (res: CM) => void) {
  socket.on("channel-message", (res: CM) => {
    console.log(res);
    callback(res);
  });
}

function sendCM(socket: Socket, channelId: number, content: string) {
  socket.emit("channel-message", {
    channelId: channelId,
    content: content,
  });
}

interface ChannelIn {
  channel: {
    id: number;
    title: string;
  };
  channelRelation: {
    user: {
      id: number;
      nickname: string;
    };
    isAdmin: boolean;
    isOwner: boolean;
    isMuted: boolean; // 이건 아직 고려중
  };
}

function receiveChannelIn(socket: Socket, callback: (res: ChannelIn) => void) {
  socket.on("channel-in", (res: ChannelIn) => {
    console.log(res);
    callback(res);
  });
}

interface ChannelOut {
  channel: {
    id: number;
    title: string;
  };
  user: {
    id: number;
  };
}

function receiveChannelOut(
  socket: Socket,
  callback: (res: ChannelOut) => void
) {
  socket.on("channel-out", (res: ChannelOut) => {
    console.log(res);
    callback(res);
  });
}

function receiveChannelMember(
  socket: Socket,
  callback: (res: ChannelIn) => void
) {
  socket.on("channel-member", (res: ChannelIn) => {
    console.log(res);
    callback(res);
  });
}

export type { CM };
export {
  receiveCM,
  sendCM,
  receiveChannelIn,
  receiveChannelOut,
  receiveChannelMember,
};
