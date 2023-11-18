import initSocket from "@/socket/initSocket";
import { createContext, useContext, useState } from "react";

interface Message {
  [key: string]: { sender: string; message: string }[];
}

interface ChannelInfo {
  [key: string]: {
    userList: {
      userId: string;
      isAdmin?: boolean;
      isOwner?: boolean;
      isMuted?: boolean;
    }[];
  };
}

interface Notification {
  type: string;
  message: string;
}

interface SocketContextType {
  channelInfo: ChannelInfo;
  chennelMessage: Message;
  directMessage: Message;
  notification: Notification[];
  setChannelInfo: (channelInfo: ChannelInfo) => void;
  setChannelMessage: (channelMessage: Message) => void;
  setDirectMessage: (directMessage: Message) => void;
  setNotification: (notification: Notification[]) => void;
}

const SocketContext = createContext<SocketContextType>({
  channelInfo: {},
  chennelMessage: {},
  directMessage: {},
  notification: [],
  setChannelInfo: () => {},
  setChannelMessage: () => {},
  setDirectMessage: () => {},
  setNotification: () => {},
});

function SocketImplement(): SocketContextType {
  const [channelInfo, setChannelInfo] = useState<ChannelInfo>({});
  const [channelMessage, setChannelMessage] = useState<Message>({});
  const [directMessage, setDirectMessage] = useState<Message>({});
  const [notification, setNotification] = useState<Notification[]>([]);
  return {
    channelInfo,
    chennelMessage: channelMessage,
    directMessage,
    notification,
    setChannelInfo,
    setChannelMessage,
    setDirectMessage,
    setNotification,
  };
}

function SocketProvider({ children }: { children: JSX.Element }) {
  const socket = SocketImplement();
  initSocket();
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
