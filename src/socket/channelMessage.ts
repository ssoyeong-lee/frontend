import { Socket } from "socket.io-client";

interface CM {
  channelId: string;
  senderId: string;
  message: string;
}

function receiveCM(socket: Socket, callback: (res: CM) => void) {
  socket.on("DM", (res: CM) => callback(res));
}

function sendCM(socket: Socket, channelId: number, content: string) {
  socket.emit("DM", {
    channelId: channelId,
    content: content,
  });
}

export type { CM };
export { receiveCM, sendCM };
