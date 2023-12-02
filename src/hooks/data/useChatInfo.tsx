import { atom, useAtom } from "jotai";
import {
  Channel,
  getChannelList,
  getMyChannels,
  joinChannel,
} from "@/api/channels";
import { getFriendList, Friend } from "@/api/users/friend";

interface FriendInfoType extends Friend {}

interface ChannelInfoType extends Channel {
  role: "Owner" | "Admin" | "User" | null;
}

const typeAtom = atom<"DM" | "CM">("DM");
const idAtom = atom<number | null>(null);
const indexAtom = atom<number | null>(null);
const friendListAtom = atom<FriendInfoType[]>([]);
const channelListAtom = atom<ChannelInfoType[]>([]);
const roleAtom = atom<"Owner" | "Admin" | "User" | null>(null);

interface ChatInfoRetType {
  chatInfo: {
    type: "DM" | "CM";
    id: number | null;
    index: number | null;
    friendList: FriendInfoType[];
    channelList: ChannelInfoType[];
    role: "Owner" | "Admin" | "User" | null;
  };
  changeType: (type: "DM" | "CM") => void;
  changeId: (id: number | null) => Promise<void>;
  updateList: (type: "DM" | "CM") => Promise<void>;
}

function useChatInfo(): ChatInfoRetType {
  const [type, setType] = useAtom(typeAtom);
  const [id, setId] = useAtom(idAtom);
  const [index, setIndex] = useAtom(indexAtom);
  const [friendList, setFriendList] = useAtom(friendListAtom);
  const [channelList, setChannelList] = useAtom(channelListAtom);
  const [role, setRole] = useAtom(roleAtom);

  const changeType = (_type: "DM" | "CM") => {
    setId(null);
    setIndex(null);
    setType(_type);
  };

  const changeId = async (_id: number | null) => {
    setId(_id);
    if (_id == null) {
      updateList(type);
      return;
    }
    if (type === "DM") {
      setRole(null);
      setIndex(friendList.findIndex((e) => e.otherUserId === _id));
    } else {
      const _idx = channelList.findIndex((e) => e.id === _id);
      setIndex(_idx);
      const ret = channelList[_idx];
      if (ret.type !== "protected") {
        if (ret.role === null) {
          await joinChannel(ret.id, "");
          updateList("CM");
        }
        setRole(ret.role);
      }
    }
  };

  const updateList = async (_type: "DM" | "CM") => {
    if (_type === "DM") {
      const myFriends = (await getFriendList()).data;
      setFriendList(myFriends);
      console.log(myFriends);
    } else {
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
      const channelList = myChanExt.concat(allChanFlt);
      setChannelList(channelList);
      console.log(channelList);
    }
  };

  const chatInfo = { type, id, index, friendList, channelList, role };
  return { chatInfo, changeType, changeId, updateList };
}

export type { ChannelInfoType, FriendInfoType };
export default useChatInfo;
