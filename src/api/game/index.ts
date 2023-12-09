import axios, { AxiosResponse } from "axios";

async function enterQueue(): Promise<AxiosResponse> {
  return axios.post("/api/game/queue", {});
}

async function leaveQueue(): Promise<AxiosResponse> {
  return axios.delete("/api/game/queue");
}

async function inviteGame(user_id: number): Promise<AxiosResponse> {
  return axios.post(`/api/game/invite/${user_id}`, {});
}

async function acceptGame(user_id: number): Promise<AxiosResponse> {
  return axios.post(`/api/game/accept/${user_id}`, {});
}

async function rejectGame(user_id: number): Promise<AxiosResponse> {
  return axios.delete(`/api/game/reject/${user_id}`, {});
}

export { enterQueue, leaveQueue, inviteGame, acceptGame, rejectGame };
