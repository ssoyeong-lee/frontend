import axios from "axios"

interface Props {
    title: string;
    type: string;
    password?: string;
}

async function createChannel({title, type, password}: Props){
    return axios.post('/api/channels', {title, type, password});
}

export {createChannel};