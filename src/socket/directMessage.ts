import { Socket } from "socket.io-client";

interface DM {
  id: number;
  sender: {
    id: number;
    nickname: string;
  };
  receiver: {
    id: number;
    nickname: string;
  };
  content: string;
  createdAt: Date;
}

interface DMUnread {
  sender: {
    id: number;
  };
  count: number;
}

function receiveDM(socket: Socket, callback: (res: DM) => void) {
  socket.on("DM", (res: DM) => {
    console.log(res);
    callback(res);
  });
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
    (res: DM[]) => {
      console.log(res);
      callback(res);
    }
  );
}

function receiveDMUnreadCount(
  socket: Socket,
  callback: (res: DMUnread[]) => void
) {
  socket.emit("DM-unread-count", (res: DMUnread[]) => {
    console.log(res);
    callback(res);
  });
}

function sendDM(socket: Socket, receiverId: number, content: string) {
  socket.emit("DM", {
    receiverId: receiverId,
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
