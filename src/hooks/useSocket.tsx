import { atom, useAtom } from "jotai";
import { Socket } from "socket.io-client";

const socketAtom = atom<Socket>({} as Socket);

interface UseSocketType {
  socket: Socket;
  setSocket: (socket: Socket) => void;
}

function useSocket(): UseSocketType {
  const [socket, setSocket] = useAtom(socketAtom);

  return { socket, setSocket };
}

export { useSocket };
