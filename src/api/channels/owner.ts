import axios from "axios"

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

export {createChannel, updateChannel};