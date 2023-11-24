import { useAuth } from "@/hooks/useAuth";
import { CM } from "@/socket/channelMessage";
import { DM } from "@/socket/directMessage";
import { atom, useAtom } from "jotai";

const DMDataAtom = atom<{ [key: string]: DM[] }>({});
const CMDataAtom = atom<{ [key: string]: CM[] }>({});

interface UseMessageType {
  DMData: { [key: number]: DM[] };
  CMData: { [key: number]: CM[] };
  setCM: (channelMessage: CM) => void;
  setDM: (directMessage: DM) => void;
}

function useMessage(): UseMessageType {
  const { auth } = useAuth();
  const [DMData, setDMData] = useAtom(DMDataAtom);
  const [CMData, setCMData] = useAtom(CMDataAtom);

  const setDM = (directMessage: DM) => {
    const senderId = directMessage.sender.id;
    const receiverId = directMessage.receiver.id;
    if (senderId === auth?.id) {
      setDMData((prev) => ({
        ...prev,
        [receiverId]: [...(prev[receiverId] ?? []), directMessage],
      }));
    } else if (receiverId === auth?.id) {
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

  return { DMData, CMData, setCM, setDM };
}

export { useMessage };
