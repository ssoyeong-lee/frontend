import { CM, receiveCM } from "@/socket/channelMessage";
import { DM, receiveDM } from "@/socket/directMessage";
import { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket;
  DMList: DM[];
  CMList: CM[];
  setSocket: (socket: Socket) => void;
  setDM: (directMessage: DM) => void;
  setCM: (channelMessage: CM) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: {} as Socket,
  DMList: [],
  CMList: [],
  setSocket: () => {},
  setDM: () => {},
  setCM: () => {},
});

function SocketImplement(): SocketContextType {
  const [socket, setSocket] = useState<Socket>({} as Socket);
  const [DMList, setDMList] = useState<DM[]>([]);
  const [CMList, setCMList] = useState<CM[]>([]);
  const setDM = (directMessage: DM) => {
    setDMList((prev) => {
      return [...prev, directMessage];
    });
  };
  const setCM = (channelMessage: CM) => {
    setCMList((prev) => {
      return [...prev, channelMessage];
    });
  };

  return {
    socket,
    DMList,
    CMList,
    setSocket,
    setDM,
    setCM,
  };
}

function SocketProvider({ children }: { children: JSX.Element }) {
  const socket = SocketImplement();
  useEffect(() => {
    try {
      receiveDM(socket.socket, socket.setDM);
      receiveCM(socket.socket, socket.setCM);
    } catch (error) {}
  }, [socket.socket]);
  useEffect(() => {
    console.log(socket.DMList);
  }, [socket.DMList]);
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
