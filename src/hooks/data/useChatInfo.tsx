import { atom, useAtom } from "jotai";
import {
  Channel,
  MemberAbstract,
  MemberDetail,
  getChannel,
  getChannelList,
  getMyChannels,
  joinChannel,
} from "@/api/channels";
import { getFriendList, Friend } from "@/api/users/friend";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { OtherUserAbstract } from "@/api/users";
import { getBanMemberList } from "@/api/channels/operate";

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
const banListAtom = atom<MemberAbstract[]>([]);

interface ChatInfoRetType {
  chatInfo: {
    type: "DM" | "CM";
    selected: DmInfoType | ChannelInfoType | null;
    friendList: DmInfoType[];
    channelList: ChannelInfoType[];
    memberList: MemberDetail[];
    banList: MemberAbstract[];
  };
  changeType: (_type: "DM" | "CM") => Promise<void>;
  changeSelected: (_id: number | null, _type?: "DM" | "CM") => Promise<void>;
  updateInfo: (_id: number | null, _type?: "DM" | "CM") => Promise<void>;
  updateMember: (_mem: MemberDetail, mode: "IN" | "OUT") => void;
  updateBan: (_mem: MemberAbstract, mode: "BAN" | "CANCEL") => void;
}

function useChatInfo(): ChatInfoRetType {
  const [type, setType] = useAtom(typeAtom);
  const [selected, setSelected] = useAtom(selectedAtom);
  const [friendList, setFriendList] = useAtom(friendListAtom);
  const [channelList, setChannelList] = useAtom(channelListAtom);
  const [memberList, setMemberList] = useAtom(memberListAtom);
  const [banList, setBanList] = useAtom(banListAtom);

  const changeType = async (_type: "DM" | "CM") => {
    setType(_type);
    setSelected(null);
    await updateInfo(null, _type);
  };

  const changeSelected = async (
    _id: number | null,
    _type: "DM" | "CM" = type
  ) => {
    if (_type === "DM") {
      console.log("changeSelected DM");
      const _idx = friendList.findIndex((e) => e.id === _id);
      _idx === -1 ? setSelected(null) : setSelected(friendList[_idx]);
    } else if (_type === "CM") {
      const _idx = channelList.findIndex((e) => e.id === _id);
      _idx === -1 ? setSelected(null) : setSelected(channelList[_idx]);

      if (
        _id !== null &&
        channelList[_idx].type !== "protected" &&
        channelList[_idx].role === null
      ) {
        // await joinChannel(_id, "");
        const chanData = (await getChannel(_id)).data;
        setMemberList(chanData.users);
      }
    }
    await updateInfo(_id, _type);
  };

  const updateInfo = async (_id: number | null, _type?: "DM" | "CM") => {
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

        if (_id !== null) {
          const chan = (await getChannel(_id)).data;
          setMemberList(chan.users);
          console.log("MEMBERLIST", chan);

          const ban = (await getBanMemberList(_id)).data;
          setBanList(ban);
          console.log("BANLIST", ban);
        }
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (typeof axiosError.response?.data.message === "object")
        toast.error(axiosError.response?.data.message[0]);
      else toast.error(axiosError.response?.data.message);
    }
  };

  const updateMember = (_mem: MemberDetail, mode: "IN" | "OUT") => {
    if (mode === "IN") {
      setMemberList((prev) => [...prev, _mem]);
    } else if (mode === "OUT") {
      const idx = memberList.findIndex((elem) => elem.id === _mem.id);
      idx !== -1 && setMemberList((prev) => [...prev].splice(idx, 1));
    }
    console.log("updateMember", memberList);
  };

  const updateBan = (_mem: MemberAbstract, mode: "BAN" | "CANCEL") => {
    if (mode === "BAN") {
      setBanList((prev) => [...prev, _mem]);
    } else if (mode === "CANCEL") {
      const idx = banList.findIndex((elem) => elem.id === _mem.id);
      idx !== -1 && setBanList((prev) => [...prev].splice(idx, 1));
    }
  };

  const chatInfo = {
    type,
    selected,
    friendList,
    channelList,
    memberList,
    banList,
  };
  return {
    chatInfo,
    changeType,
    changeSelected,
    updateInfo,
    updateMember,
    updateBan,
  };
}

export type { ChannelInfoType };
export default useChatInfo;
