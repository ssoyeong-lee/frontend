import { io } from "socket.io-client";

const socketUri =
  "https://ec2-15-164-74-198.ap-northeast-2.compute.amazonaws.com:3000";

const socket = io(socketUri);

export default socket;
