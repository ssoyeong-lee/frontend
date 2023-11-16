import socket from "@/socket/index";

function receiveDM(
  callback: (res: { senderId: string; message: string }) => void
) {
  socket.on("DM", (res: { senderId: string; message: string }) =>
    callback(res)
  );
}

function recieveDMList(recieverId: number, callback: (res: any) => void) {
  socket.emit(
    "DM-messages",
    {
      otherUserId: recieverId,
    },
    (res: any) => callback(res)
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

export { receiveDM, recieveDMList, sendDM, sendDMRead };
