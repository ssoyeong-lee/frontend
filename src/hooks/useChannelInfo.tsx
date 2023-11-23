import { Channel, getChannelList, getMyChannel } from "@/api/channels";
import { atom } from "jotai";

const mode = atom("user");
const chatId = atom(-1);
const chatList = atom<Channel[]>([]);

const updateChannelList = atom(
  null,
  async (get, set)=> {
    const allChannel = (await getChannelList()).data;
    const myChannel = (await getMyChannel()).data.map(li=>li.channel);
    for (let i = 0; i < myChannel.length; i++){
      for (let j = 0; j < allChannel.length; j++)
        if (myChannel[i].id === allChannel[j].id){
          allChannel.splice(j, 1);
          break;
        }
    }
    set(chatList, myChannel.concat(allChannel));
  }
)

export { mode, chatId, chatList, updateChannelList };