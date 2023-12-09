import { getUserMe } from "@/api/users/index";
import { useAuth } from "@/hooks/data/useAuth";
import { useMessage } from "@/hooks/data/useMessage";
import { useNoti } from "@/hooks/data/useNoti";
import {
  receiveCM,
  receiveChannelIn,
  receiveChannelMember,
  receiveChannelOut,
} from "@/socket/channelMessage";
import { receiveDM, receiveDMUnreadCount } from "@/socket/directMessage";
import {
  receiveNotification,
  receiveNotificationList,
} from "@/socket/notification";
import { atom, useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Socket } from "socket.io-client";

const socketAtom = atom<Socket>({} as Socket);

interface UseSocketType {
  socket: Socket;
  setSocket: (socket: Socket) => void;
}

function useSocket(): UseSocketType {
  const { setAuth } = useAuth();
  const router = useRouter();
  const {
    setDM,
    setCM,
    setDMUnreadCount,
    increaseDMUnreadCount,
    increaseCMUnreadCount,
  } = useMessage();
  const { setNoti, setNotiList } = useNoti();
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
            receiveNotificationList(socket, setNotiList);
            receiveDM(socket, (data) => {
              setDM(data, res.data.id);
              increaseDMUnreadCount(data.sender.id);
            });
            receiveDMUnreadCount(socket, (data) => {
              for (const key in data) {
                setDMUnreadCount(data[key].sender.id, data[key].count);
              }
            });
            receiveCM(socket, (data) => {
              setCM(data);
              increaseCMUnreadCount(data.channel.id);
            });
            receiveChannelIn(socket, () => {});
            receiveChannelOut(socket, () => {});
            receiveChannelMember(socket, () => {});
            receiveNotification(socket, setNoti);
            console.log("set receive func finished");
          })
          .catch((err) => {
            console.error("auth failed");
            console.error(err);
          });
      });
      s.on("disconnect", () => {
        console.log("socket disconnected");
        toast.error("서버와의 연결이 끊어졌습니다.");
        router.push("/login");
      });
      return s;
    });
  }, [socket]);

  return { socket, setSocket };
}

export { useSocket };
