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

interface Props {
    title: string;
    type: string;
    password?: string | null;
}

async function createChannel({title, type, password}: Props){
    return axios.post('/api/channels', {title, type, password});
}

async function updateChannel(channel_id: number, {title, type, password}: Props){
    console.log(password);
    return axios.put(`/api/channels/${channel_id}`, {title, type, password});
}

export type { Channel };
export { getChannelList, getChannel, createChannel, updateChannel };