import socket from "@/socket/index";

function connectSocket() {
  console.log("connectSocket");
  socket.on("connect", () => {
    console.log(socket.id);
  });
}

export default connectSocket;
