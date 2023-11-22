import { getUserMe } from "@/api/users/index";
import { CM, receiveCM } from "@/socket/channelMessage";
import { DM, receiveDM } from "@/socket/directMessage";
import {
  Notification,
  NotificationType,
  receiveNotification,
} from "@/socket/notification";
import { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket;
  DMData: { [key: number]: DM[] };
  CMData: { [key: number]: CM[] };
  NotiData: Notification<NotificationType>[];
  setSocket: (socket: Socket) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: {} as Socket,
  DMData: {},
  CMData: {},
  NotiData: [],
  setSocket: () => {},
});

function SocketImplement(): SocketContextType {
  const [socket, setSocket] = useState<Socket>({} as Socket);
  const [userId, setUserId] = useState<number>(-1);
  const [DMData, setDMData] = useState<{ [key: string]: DM[] }>({});
  const [CMData, setCMData] = useState<{ [key: string]: CM[] }>({});
  const [NotiData, setNotiData] = useState<Notification<NotificationType>[]>(
    []
  );
  const setDM = (directMessage: DM) => {
    const senderId = directMessage.sender.id;
    const receiverId = directMessage.receiver.id;
    if (senderId === userId) {
      setDMData((prev) => ({
        ...prev,
        [receiverId]: [...(prev[receiverId] ?? []), directMessage],
      }));
    } else if (receiverId === userId) {
      setDMData((prev) => ({
        ...prev,
        [senderId]: [...(prev[senderId] ?? []), directMessage],
      }));
    }
  };
  const setCM = (channelMessage: CM) => {
    const channelId = channelMessage.channelId;
    setCMData((prev) => ({
      ...prev,
      [channelId]: [...(prev[channelId] ?? []), channelMessage],
    }));
  };
  const setNoti = (notification: Notification<NotificationType>) => {
    setNotiData((prev) => [...prev, notification]);
  };

  useEffect(() => {
    if (socket.id === undefined) return;
    getUserMe()
      .then((res) => {
        setUserId(res.data.id);
      })
      .catch(() => {});
  }, [socket]);

  useEffect(() => {
    try {
      receiveDM(socket, setDM);
      receiveCM(socket, setCM);
      receiveNotification(socket, setNoti);
    } catch (error) {}
  }, [userId]);

  return {
    socket,
    DMData,
    CMData,
    NotiData,
    setSocket,
  };
}

function SocketProvider({ children }: { children: JSX.Element }) {
  const socket = SocketImplement();
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
}

export { SocketProvider, useSocket };
