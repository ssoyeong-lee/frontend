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

interface DmInfoType extends OtherUserAbstract {
  chatType: "DM";
}

interface ChannelInfoType extends Channel {
  chatType: "CM";
  role: "Owner" | "Admin" | "User" | null;
}

const typeAtom = atom<"DM" | "CM">("DM");
const selectedAtom = atom<DmInfoType | ChannelInfoType | null>(null);
const friendListAtom = atom<DmInfoType[]>([]);
const channelListAtom = atom<ChannelInfoType[]>([]);
const memberListAtom = atom<MemberDetail[]>([]);

interface ChatInfoRetType {
  chatInfo: {
    type: "DM" | "CM";
    selected: DmInfoType | ChannelInfoType | null;
    friendList: DmInfoType[];
    channelList: ChannelInfoType[];
    memberList: MemberDetail[];
  };
  changeType: (_type: "DM" | "CM") => Promise<void>;
  changeSelected: (_id: number | null, _type?: "DM" | "CM") => Promise<void>;
  updateInfo: (_type?: "DM" | "CM") => Promise<void>;
  //memeberList 업데이트
}

function useChatInfo(): ChatInfoRetType {
  const [type, setType] = useAtom(typeAtom);
  const [selected, setSelected] = useAtom(selectedAtom);
  const [friendList, setFriendList] = useAtom(friendListAtom);
  const [channelList, setChannelList] = useAtom(channelListAtom);
  const [memberList, setMemberList] = useAtom(memberListAtom);

  const changeType = async (_type: "DM" | "CM") => {
    setType(_type);
    await updateInfo(_type);
  };

  const changeSelected = async (
    _id: number | null,
    _type: "DM" | "CM" = type
  ) => {
    if (_id === null) {
      setSelected(null);
      await updateInfo();
      return;
    }
    if (_type === "DM") {
      console.log("changeSelected DM");
      const _idx = friendList.findIndex((e) => e.id === _id);
      _idx === -1 ? setSelected(null) : setSelected(friendList[_idx]);
    } else if (_type === "CM") {
      const _idx = channelList.findIndex((e) => e.id === _id);
      _idx === -1 ? setSelected(null) : setSelected(channelList[_idx]);

      if (
        channelList[_idx].type !== "protected" &&
        channelList[_idx].role === null
      ) {
        await joinChannel(_id, "");
        const chanData = (await getChannel(_id)).data;
        setMemberList(chanData.users);
      }
    }
    await updateInfo(_type);
  };

  const updateInfo = async (_type: "DM" | "CM" = type) => {
    try {
      if (_type === "DM") {
        console.log("Update DM");
        const myFriends = (await getFriendList()).data;
        setFriendList(
          myFriends.map((elem) => {
            return { chatType: "DM", ...elem };
          })
        );
        console.log("myFriends: ", myFriends);
      } else if (_type === "CM") {
        const allChan = (await getChannelList()).data;
        const myChan = (await getMyChannels()).data;

        const allChanExt = allChan.map((_chan) => {
          const ret: ChannelInfoType = { ..._chan, role: null, chatType: "CM" };
          const idx = myChan.findIndex((elem) => elem.id === ret.id);
          if (idx !== -1) ret.role = myChan[idx].role;
          return ret;
        });
        const myChanExt = myChan.map((_chan) => {
          const ret: ChannelInfoType = {
            ..._chan,
            role: _chan.role,
            chatType: "CM",
          };
          return ret;
        });
        const allChanFlt = allChanExt.filter((_chan) => _chan.role === null);
        const channelList = myChanExt.concat(allChanFlt);
        setChannelList(channelList);
        console.log(channelList);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (typeof axiosError.response?.data.message === "object")
        toast.error(axiosError.response?.data.message[0]);
      else toast.error(axiosError.response?.data.message);
    }
  };

  const chatInfo = { type, selected, friendList, channelList, memberList };
  return { chatInfo, changeType, changeSelected, updateInfo };
}

export type { ChannelInfoType };
export default useChatInfo;
