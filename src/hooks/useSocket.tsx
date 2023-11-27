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
  const { setAuth } = useAuth();
  const { setDM, setCM } = useMessage();
  const { setNoti } = useNoti();
  const [socket, setSocket] = useAtom(socketAtom);

  useEffect(() => {
    if (socket.on === undefined) return;
    if (socket.connected) return;
    setSocket((s) => {
      s.on("connect", () => {
        console.log("socket connected");
        getUserMe()
          .then((res) => {
            console.log(res.data.nickname + " authed");
            setAuth(res.data);
            receiveDM(socket, setDM);
            receiveCM(socket, setCM);
            receiveNotification(socket, setNoti);
            console.log("set receive func finished");
          })
          .catch((err) => {
            console.error("auth failed");
            console.error(err);
          });
      });
      s.on("disconnect", () => {
        console.log("disconnect");
      });
      return s;
    });
  }, [socket]);

  return { socket, setSocket };
}

export { useSocket };
