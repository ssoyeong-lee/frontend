import { CM } from "@/socket/channelMessage";
import { DM } from "@/socket/directMessage";
import { atom, useAtom } from "jotai";

const DMDataAtom = atom<{ [key: number]: DM[] }>({});
const CMDataAtom = atom<{ [key: number]: CM[] }>({});

interface UseMessageType {
  DMData: { [key: number]: DM[] };
  CMData: { [key: number]: CM[] };
  setCM: (channelMessage: CM) => void;
  setDM: (directMessage: DM, authId: number) => void;
  setCMList: (channelMessages: CM[], id: number) => void;
  setDMList: (directMessages: DM[], id: number) => void;
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
        [receiverId]: [...(prev[receiverId] ?? []), directMessage],
      }));
    } else if (receiverId === authId) {
      setDMData((prev) => ({
        ...prev,
        [senderId]: [...(prev[senderId] ?? []), directMessage],
      }));
    }
  };
  const setCM = (channelMessage: CM) => {
    /*
    const channelId = channelMessage.channelId;
    setCMData((prev) => ({
      ...prev,
      [channelId]: [...(prev[channelId] ?? []), channelMessage],
    }));
    */
  };
  const setCMList = (channelMessages: CM[], id: number) => {
    setCMData((prev) => ({
      ...prev,
      [id]: channelMessages,
    }));
  };
  const setDMList = (directMessages: DM[], id: number) => {
    setDMData((prev) => ({
      ...prev,
      [id]: directMessages,
    }));
  };

  return { DMData, CMData, setCM, setDM, setCMList, setDMList };
}

export { useMessage };
