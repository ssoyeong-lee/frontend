import { Socket } from "socket.io-client";

interface CM {
  channelId: string;
  sender: { id: number; nickname: string };
  receiver: { id: number; nickname: string };
  content: string;
  createdAt: string;
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
