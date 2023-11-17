import axios from "axios";

interface Channel {
    id: number;
    title: string;
    type: "public" | "protected" | "private";
    password?: string;
}

async function getChannelList(){
    return axios.get('/api/channels');
}

async function getChannel(channel_id: number){
    return axios.get(`/api/channels/${channel_id}`);
}

export type { Channel };
export { getChannelList, getChannel };