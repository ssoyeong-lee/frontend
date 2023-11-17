import axios from "axios";

async function giveAdmin(channel_id: number, user_id: number) {
  return axios.put(`/channels/${channel_id}/admin/${user_id}/give`);
}

async function depriveAdmin(channel_id: number, user_id: number) {
  return axios.put(`/channels/${channel_id}/admin/${user_id}/deprive`);
}

export { giveAdmin, depriveAdmin };
