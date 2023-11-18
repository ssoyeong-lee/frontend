import { io } from "socket.io-client";

console.log("socket");

const socketUri =
  "https://ec2-15-164-74-198.ap-northeast-2.compute.amazonaws.com:3000";

const socket = io(socketUri, {
  withCredentials: true,
});

export default socket;
