import axios, { AxiosResponse } from "axios";

async function enterQueue(
  mode: "standard" | "extreme"
): Promise<AxiosResponse> {
  return axios.post("/api/games/queue", { mode });
}

async function leaveQueue(): Promise<AxiosResponse> {
  return axios.delete("/api/games/queue");
}

async function inviteGame(user_id: number): Promise<AxiosResponse> {
  return axios.post(`/api/games/invite/${user_id}`, { mode: "standard" });
}

async function acceptGame(user_id: number): Promise<AxiosResponse> {
  return axios.post(`/api/games/accept/${user_id}`, {});
}

async function rejectGame(user_id: number): Promise<AxiosResponse> {
  return axios.delete(`/api/games/reject/${user_id}`, {});
}

export { enterQueue, leaveQueue, inviteGame, acceptGame, rejectGame };
