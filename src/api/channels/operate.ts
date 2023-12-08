import axios, { AxiosResponse } from "axios";
import { UserDetail } from "../users";

async function inviteUser(channel_id: number, user_id: number) {
  return axios.post(`/api/channels/${channel_id}/invite/${user_id}`, {});
}

async function acceptInvite(channel_id: number) {
  return axios.post(`/api/channels/${channel_id}/accept-invite`, {});
}

async function rejectInvite(channel_id: number) {
  return axios.post(`/api/channels/${channel_id}/refuse-invite`, {});
}

async function kickMember(channel_id: number, user_id: number) {
  return axios.delete(`/api/channels/${channel_id}/kick/${user_id}`);
}

async function getBanMemberList(channel_id: number): Promise<AxiosResponse<UserDetail[]>> {
  return axios.get(`/api/channels/${channel_id}/ban`);
}

async function banMember(channel_id: number, user_id: number) {
  return axios.post(`/api/channels/${channel_id}/ban/${user_id}`, {});
}

async function removeBanMember(channel_id: number, user_id: number) {
  return axios.delete(`/api/channels/${channel_id}/ban/${user_id}`);
}

async function muteMember(channel_id: number, user_id: number) {
  return axios.post(`/api/channels/${channel_id}/mute/${user_id}`, {});
}

export {
  inviteUser,
  acceptInvite,
  rejectInvite,
  kickMember,
  getBanMemberList,
  banMember,
  removeBanMember,
  muteMember,
};
