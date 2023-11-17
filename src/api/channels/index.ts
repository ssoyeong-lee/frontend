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

export type { Channel };
export { getChannelList };