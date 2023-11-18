import socket from "@/socket/index";

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

function receiveDM(callback: (res: DM) => void) {
  socket.on("DM", (res: DM) => callback(res));
}

function recieveDMList(otherUserId: number, callback: (res: DM[]) => void) {
  socket.emit(
    "DM-messages",
    {
      otherUserId: otherUserId,
    },
    (res: { messages: DM[] }) => callback(res.messages)
  );
}

function receiveDMUnreadCount(callback: (res: DMUnread[]) => void) {
  socket.emit("DM-unread-count", (res: { unreadMessagesCount: DMUnread[] }) =>
    callback(res.unreadMessagesCount)
  );
}

function sendDM(recieverId: number, content: string) {
  socket.emit("DM", {
    recieverId: recieverId,
    content: content,
  });
}

function sendDMRead(senderId: number) {
  socket.emit("DM-read", {
    senderId: senderId,
  });
}

export { receiveDM, recieveDMList, receiveDMUnreadCount, sendDM, sendDMRead };
