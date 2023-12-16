import { CM } from "@/socket/channelMessage";
import { DM } from "@/socket/directMessage";
import { atom, useAtom } from "jotai";

const DMDataAtom = atom<{
  [key: number]: { message: DM[]; unreadCount: number };
}>({});
const CMDataAtom = atom<{
  [key: number]: { message: CM[]; unreadCount: number };
}>({});

interface UseMessageType {
  DMData: { [key: number]: { message: DM[]; unreadCount: number } };
  CMData: { [key: number]: { message: CM[]; unreadCount: number } };
  setCM: (channelMessage: CM) => void;
  setDM: (directMessage: DM, authId: number) => void;
  setCMList: (channelMessages: CM[], id: number) => void;
  setDMList: (directMessages: DM[], id: number) => void;
  setDMUnreadCount: (id: number, unreadCount: number) => void;
  setCMUnreadCount: (id: number, unreadCount: number) => void;
  increaseDMUnreadCount: (id: number) => void;
  increaseCMUnreadCount: (id: number) => void;
}

function useMessage(): UseMessageType {
  const [DMData, setDMData] = useAtom(DMDataAtom);
  const [CMData, setCMData] = useAtom(CMDataAtom);

  const setDM = (directMessage: DM, authId: number) => {
    const senderId = directMessage.sender.id;
    const receiverId = directMessage.receiver.id;
    if (senderId === authId) {
      setDMData((prev) => ({
        ...prev,
        [receiverId]: {
          message: [...(prev[receiverId]?.message ?? []), directMessage],
          unreadCount: prev[receiverId]?.unreadCount ?? 0,
        },
      }));
    } else if (receiverId === authId) {
      setDMData((prev) => ({
        ...prev,
        [senderId]: {
          message: [...(prev[senderId]?.message ?? []), directMessage],
          unreadCount: prev[senderId]?.unreadCount ?? 0,
        },
      }));
    }
  };
  const setCM = (channelMessage: CM) => {
    const channelId = channelMessage.channel.id;
    setCMData((prev) => ({
      ...prev,
      [channelId]: {
        message: [...(prev[channelId]?.message ?? []), channelMessage],
        unreadCount: prev[channelId]?.unreadCount ?? 0,
      },
    }));
  };
  const setCMList = (channelMessages: CM[], id: number) => {
    setCMData((prev) => ({
      ...prev,
      [id]: {
        message: channelMessages,
        unreadCount: prev[id]?.unreadCount ?? 0,
      },
    }));
  };
  const setDMList = (directMessages: DM[], id: number) => {
    setDMData((prev) => ({
      ...prev,
      [id]: {
        message: directMessages,
        unreadCount: prev[id]?.unreadCount ?? 0,
      },
    }));
  };
  const setDMUnreadCount = (id: number, unreadCount: number) => {
    setDMData((prev) => ({
      ...prev,
      [id]: {
        message: prev[id]?.message ?? [],
        unreadCount: unreadCount,
      },
    }));
  };
  const setCMUnreadCount = (id: number, unreadCount: number) => {
    setCMData((prev) => ({
      ...prev,
      [id]: {
        message: prev[id]?.message ?? [],
        unreadCount: unreadCount,
      },
    }));
  };
  const increaseDMUnreadCount = (id: number) => {
    setDMData((prev) => ({
      ...prev,
      [id]: {
        message: prev[id]?.message ?? [],
        unreadCount: prev[id]?.unreadCount + 1 ?? 1,
      },
    }));
  };
  const increaseCMUnreadCount = (id: number) => {
    setCMData((prev) => ({
      ...prev,
      [id]: {
        message: prev[id]?.message ?? [],
        unreadCount: prev[id]?.unreadCount + 1 ?? 1,
      },
    }));
  };

  return {
    DMData,
    CMData,
    setCM,
    setDM,
    setCMList,
    setDMList,
    setDMUnreadCount,
    setCMUnreadCount,
    increaseDMUnreadCount,
    increaseCMUnreadCount,
  };
}

export { useMessage };
