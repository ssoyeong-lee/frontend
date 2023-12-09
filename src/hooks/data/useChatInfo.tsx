import { atom, useAtom } from "jotai";
import {
  Channel,
  MemberDetail,
  MyChannel,
  getChannel,
  getChannelList,
  getMyChannels,
  joinChannel,
} from "@/api/channels";
import { getFriendList, Friend } from "@/api/users/friend";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { OtherUserAbstract } from "@/api/users";

interface FriendInfoType extends Friend {}

interface ChannelInfoType extends Channel {
  role: "Owner" | "Admin" | "User" | null;
}

const typeAtom = atom<"DM" | "CM">("DM");
const selectedAtom = atom<OtherUserAbstract | ChannelInfoType | null>(null);
const friendListAtom = atom<OtherUserAbstract[]>([]);
const channelListAtom = atom<ChannelInfoType[]>([]);
const memberListAtom = atom<MemberDetail[]>([]);

interface ChatInfoRetType {
  chatInfo: {
    type: "DM" | "CM";
    selected: OtherUserAbstract | ChannelInfoType | null;
    friendList: OtherUserAbstract[];
    channelList: ChannelInfoType[];
    memberList: MemberDetail[];
  };
  changeType: (type: "DM" | "CM") => void;
  changeSelected: (_id: number | null) => Promise<void>;
  //memeberList 업데이트
}

function useChatInfo(): ChatInfoRetType {
  const [type, setType] = useAtom(typeAtom);
  const [selected, setSelected] = useAtom(selectedAtom);
  const [friendList, setFriendList] = useAtom(friendListAtom);
  const [channelList, setChannelList] = useAtom(channelListAtom);
  const [memberList, setMemberList] = useAtom(memberListAtom);

  const changeType = (_type: "DM" | "CM") => {
    setType(_type);
    changeSelected(null);
  };

  const changeSelected = async (_id: number | null) => {
    await updateInfo();
    if (_id === null)
      return;
    if (type === "DM") {
      const _idx = friendList.findIndex((e) => e.id === _id);
      _idx === null ? setSelected(null) : setSelected(friendList[_idx]);
    } else if (type === "CM") {
      const _idx = channelList.findIndex((e) => e.id === _id);
      _idx === null ? setSelected(null) : setSelected(channelList[_idx]);
      
      const chanData = (await getChannel(_id)).data;
      setMemberList(chanData.users);
    }
  };

  const updateInfo = async () => {
    try {
      if (type === "DM") {
        const myFriends = (await getFriendList()).data;
        setFriendList(myFriends);
        console.log("myFriends: ", myFriends);
        setSelected(null);
      } else if (type === "CM") {
        const allChan = (await getChannelList()).data;
        const myChan = (await getMyChannels()).data;

        const allChanExt = allChan.map((_chan) => {
          const ret: ChannelInfoType = { ..._chan, role: null };
          const idx = myChan.findIndex((elem) => elem.id === ret.id);
          if (idx !== -1) ret.role = myChan[idx].role;
          return ret;
        });
        const myChanExt = myChan.map((_chan) => {
          const ret: ChannelInfoType = { ..._chan, role: _chan.role };
          return ret;
        });
        const allChanFlt = allChanExt.filter((_chan) => _chan.role === null);
        const channelList = myChanExt.concat(allChanFlt);
        setChannelList(channelList);
        console.log(channelList);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.status);
    }
  };

  const chatInfo = { type, selected, friendList, channelList, memberList };
  return { chatInfo, changeType, changeSelected };
}

export type { ChannelInfoType, FriendInfoType };
export default useChatInfo;
