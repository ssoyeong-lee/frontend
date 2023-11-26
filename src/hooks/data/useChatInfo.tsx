import { atom, useAtom } from "jotai";
import { Channel, getChannelList } from "@/api/channels";

const typeAtom = atom<"DM" | "CM">("DM");
const idAtom = atom<number | null>(null);
const listAtom = atom<Channel[]>([]);

interface ChatInfoRetType {
  chatInfo: {
    type: "DM" | "CM";
    id: number | null;
    list: Channel[];
  };
  changeType: (type: "DM" | "CM") => void;
  changeId: (id: number) => void;
  updateList: (type: "DM" | "CM") => Promise<void>;
}

function useChatInfo(): ChatInfoRetType {
  const [type, setType] = useAtom(typeAtom);
  const [id, setId] = useAtom(idAtom);
  const [list, setList] = useAtom(listAtom);
  
  const changeType = (abc: "DM" | "CM") => {
    setType(abc);
    console.log("change Type: ",type);
    setId(null);
  };

  const changeId = (id: number) => {
    setId(id);
  };

  const updateList = async (abc: "DM" | "CM") => {
    if (abc === "DM"){
      setList([]);
      console.log(abc, list);
      return ;
    }
    const tmp = await getChannelList();
    setList(tmp.data);
  }
  
  const chatInfo = { type, id, list };
  return { chatInfo, changeType, changeId, updateList };
}

export default useChatInfo;

// const mode = atom("user");
// const chatId = atom(-1);
// const chatList = atom<Channel[]>([]);

// interface ExtraChannel extends Channel {
//   isJoined:boolean
// }
// const updateChannelList = atom(
//   null,
//   async (get, set)=> {
//     const allChannel = (await getChannelList()).data;
//     const myChannel = (await getMyChannel()).data.map(li=>li.channel);
//     const newAllChannel: ExtraChannel[] = allChannel.map((ch) =>{
//       const newCh = {...ch, isJoined : false};
//       if (myChannel.has(ch.id))
//         newCh.isJoined = true;
//       else
//         newCh.isJoined = false;
//       return newCh;
//     });
//     set(chatList, myChannel.concat(allChannel));
//   }
// )

// getChannelList.filter((ch) => ch.isJoined === true).map(() => {
//   <></>
// })

// export { mode, chatId, chatList, updateChannelList };
