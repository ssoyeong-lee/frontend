import { atom, useAtom } from "jotai";
import { Channel, getChannelList, getMyChannels } from "@/api/channels";

interface ChannelInfoType extends Channel {
  role: "Owner" | "Admin" | "User" | null;
}

const typeAtom = atom<"DM" | "CM">("DM");
const idAtom = atom<number | null>(null);
const listAtom = atom<ChannelInfoType[]>([]);
const roleAtom = atom<"Owner" | "Admin" | "User" | null>(null);

interface ChatInfoRetType {
  chatInfo: {
    type: "DM" | "CM";
    id: number | null;
    list: ChannelInfoType[];
    role: "Owner" | "Admin" | "User" | null;
  };
  changeType: (type: "DM" | "CM") => void;
  changeId: (id: number) => void;
  updateList: (type: "DM" | "CM") => Promise<void>;
}

function useChatInfo(): ChatInfoRetType {
  const [type, setType] = useAtom(typeAtom);
  const [id, setId] = useAtom(idAtom);
  const [list, setList] = useAtom(listAtom);
  const [role, setRole] = useAtom(roleAtom);

  const changeType = (_type: "DM" | "CM") => {
    setType(_type);
    setId(null);
  };

  const changeId = (_id: number) => {
    setId(_id);
    if (type == "DM") return;
    const ret = list.filter((e) => e.id == _id);
    setRole(ret[0].role);
  };

  const updateList = async (_type: "DM" | "CM") => {
    if (_type === "DM") {
      setList([]);
      console.log(_type, list);
      return;
    }
    const allChan = (await getChannelList()).data;
    const myChan = (await getMyChannels()).data;

    const allChanExt = allChan.map((_chan) => {
      const ret: ChannelInfoType = { ..._chan, role: null };
      const idx = myChan.findIndex((elem) => elem.channel.id === ret.id);
      if (idx !== -1) ret.role = myChan[idx].role;
      return ret;
    });
    const myChanExt = myChan.map((_chan) => {
      const ret: ChannelInfoType = { ..._chan.channel, role: _chan.role };
      return ret;
    });
    const allChanFlt = allChanExt.filter((_chan) => _chan.role === null);
    setList(myChanExt.concat(allChanFlt));
    console.log(myChanExt.concat(allChanFlt));
  };

  const chatInfo = { type, id, list, role };
  return { chatInfo, changeType, changeId, updateList };
}

export default useChatInfo;