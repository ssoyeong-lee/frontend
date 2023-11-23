import { Channel, getChannelList } from "@/api/channels";
import { atom } from "jotai";

const mode = atom("user");
const chatId = atom(-1);
const chatList = atom<Channel[]>([]);

export { mode, chatId, chatList };