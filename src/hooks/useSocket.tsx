import { getUserMe } from "@/api/users/index";
import { useAuth } from "@/hooks/useAuth";
import { useMessage } from "@/hooks/useMessage";
import { receiveCM } from "@/socket/channelMessage";
import { receiveDM } from "@/socket/directMessage";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

const socketAtom = atom<Socket>({} as Socket);

interface UseSocketType {
  socket: Socket;
  setSocket: (socket: Socket) => void;
}

function useSocket(): UseSocketType {
  const { auth, setAuth } = useAuth();
  const { setDM, setCM } = useMessage();
  const [socket, setSocket] = useAtom(socketAtom);

  useEffect(() => {
    if (socket.id === undefined) return;
    getUserMe().then((res) => {
      setAuth(res.data);
    });
  }, [socket]);

  useEffect(() => {
    try {
      receiveDM(socket, setDM);
      receiveCM(socket, setCM);
    } catch (error) {}
  }, [auth]);

  return { socket, setSocket };
}

export { useSocket };
