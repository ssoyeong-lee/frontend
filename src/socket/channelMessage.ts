import { Socket } from "socket.io-client";

interface ChannelMessage {
  channelId: string;
  senderId: string;
  message: string;
}

function receiveCM(socket: Socket, callback: (res: ChannelMessage) => void) {
  socket.on("DM", (res: ChannelMessage) => callback(res));
}

function sendCM(socket: Socket, channelId: number, content: string) {
  socket.emit("DM", {
    channelId: channelId,
    content: content,
  });
}

export { receiveCM, sendCM };
