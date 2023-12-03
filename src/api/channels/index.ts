import axios, { AxiosResponse } from "axios";

interface Channel {
  id: number;
  title: string;
  type: "public" | "protected" | "private";
  password?: string;
}

async function getChannelList(): Promise<AxiosResponse<Channel[]>> {
  return axios.get("/api/channels");
}

interface ChannelRelation {
  createAt: string;
  id: number;
  isAdmin: boolean;
  isBanned: boolean;
  isOwner: boolean;
  muteUntil: string | null;
}

interface SpecificChannel extends Channel {
  channelRelations: {[key: number]: {channelRelation: ChannelRelation}}[];
}

async function getChannel(channel_id: number): Promise<AxiosResponse<SpecificChannel>> {
  return axios.get(`/api/channels/${channel_id}`);
}

interface Props {
  title: string;
  type: string;
  password?: string | null;
}

async function createChannel({ title, type, password }: Props) {
  return axios.post("/api/channels", { title, type, password });
}

async function updateChannel(
  channel_id: number,
  { title, type, password }: Props
) {
  if (type === "protected" && password !== "")
    return axios.put(`/api/channels/${channel_id}`, { title, type, password });
  return axios.put(`/api/channels/${channel_id}`, { title, type });
}

async function joinChannel(channel_id: number, password: string) {
  if (password != "")
    return axios.post(`/api/channels/${channel_id}`, {
      providedPassword: password,
    });
  return axios.post(`/api/channels/${channel_id}`, {});
}

async function leaveChannel(channel_id: number) {
  return axios.delete(`/api/channels/${channel_id}`);
}

interface MyChannel {
  channel: Channel;
  role: "Owner" | "Admin" | "User";
}

async function getMyChannels(): Promise<AxiosResponse<MyChannel[]>> {
  return axios.get("/api/channels/me");
}

export type { Channel, ChannelRelation, SpecificChannel, MyChannel };
export {
  getChannelList,
  getChannel,
  createChannel,
  updateChannel,
  joinChannel,
  leaveChannel,
  getMyChannels,
};
