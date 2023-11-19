import { Socket } from "socket.io-client";

interface DM {
  data: {
    id: number;
    sender: {
      id: number; // userId
      nickname: string;
    };
    content: string;
    createdAt: Date;
  };
}

interface DMUnread {
  sender: {
    id: number; // userId
    nickname: string;
  };
  count: number;
}

function receiveDM(socket: Socket, callback: (res: DM) => void) {
  socket.on("DM", (res: DM) => callback(res));
}

function recieveDMList(
  socket: Socket,
  otherUserId: number,
  callback: (res: DM[]) => void
) {
  socket.emit(
    "DM-messages",
    {
      otherUserId: otherUserId,
    },
    (res: { messages: DM[] }) => callback(res.messages)
  );
}

function receiveDMUnreadCount(
  socket: Socket,
  callback: (res: DMUnread[]) => void
) {
  socket.emit("DM-unread-count", (res: { unreadMessagesCount: DMUnread[] }) =>
    callback(res.unreadMessagesCount)
  );
}

function sendDM(socket: Socket, recieverId: number, content: string) {
  socket.emit("DM", {
    recieverId: recieverId,
    content: content,
  });
}

function sendDMRead(socket: Socket, senderId: number) {
  socket.emit("DM-read", {
    senderId: senderId,
  });
}

export type { DM, DMUnread };
export { receiveDM, recieveDMList, receiveDMUnreadCount, sendDM, sendDMRead };
