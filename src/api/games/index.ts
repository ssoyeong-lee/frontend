import axios, { AxiosResponse } from "axios";

async function enterQueue(): Promise<AxiosResponse> {
  return axios.post("/api/games/queue", {});
}

async function leaveQueue(): Promise<AxiosResponse> {
  return axios.delete("/api/games/queue");
}

async function inviteGame(user_id: number): Promise<AxiosResponse> {
  return axios.post(`/api/games/invite/${user_id}`, {});
}

async function acceptGame(user_id: number): Promise<AxiosResponse> {
  return axios.post(`/api/games/accept/${user_id}`, {});
}

async function rejectGame(user_id: number): Promise<AxiosResponse> {
  return axios.delete(`/api/games/reject/${user_id}`, {});
}

export { enterQueue, leaveQueue, inviteGame, acceptGame, rejectGame };
