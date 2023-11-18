import socket from "@/socket/index";

function initSocket() {
  socket.on("connect", () => {
    console.log(socket.id);
  });
}

export default initSocket;
