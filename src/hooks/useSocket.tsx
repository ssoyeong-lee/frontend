import { getUserMe } from "@/api/users/index";
import { useAuth } from "@/hooks/data/useAuth";
import { useMessage } from "@/hooks/data/useMessage";
import { useNoti } from "@/hooks/data/useNoti";
import { receiveCM } from "@/socket/channelMessage";
import { receiveDM } from "@/socket/directMessage";
import { receiveNotification } from "@/socket/notification";
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
  const { setNoti } = useNoti();
  const [socket, setSocket] = useAtom(socketAtom);

  useEffect(() => {
    if (socket.on === undefined) return;
    socket.on("connect", () => {
      console.log(socket);
      getUserMe().then((res) => {
        setAuth(res.data);
      });
    });
  }, [socket]);

  useEffect(() => {
    try {
      receiveDM(socket, setDM);
      receiveCM(socket, setCM);
      receiveNotification(socket, setNoti);
    } catch (error) {}
  }, [auth]);

  return { socket, setSocket };
}

export { useSocket };
