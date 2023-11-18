import socket from "@/socket/index";

interface ChannelMessage {
  channelId: string;
  senderId: string;
  message: string;
}

function receiveCM(callback: (res: ChannelMessage) => void) {
  socket.on("DM", (res: ChannelMessage) => callback(res));
}

function sendCM(channelId: number, content: string) {
  socket.emit("DM", {
    channelId: channelId,
    content: content,
  });
}

export { receiveCM, sendCM };
