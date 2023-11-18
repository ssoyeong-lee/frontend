import axios, { AxiosResponse } from "axios";

interface Block {
  otherUserId: number;
  nickname: string;
}
async function getBlockList(): Promise<AxiosResponse<Block[]>> {
  return axios.get("/api/user-relation/block");
}

async function postBlock(user_id: number) {
  return axios.post(`/api/user-relation/block/${user_id}`, {});
}

async function deleteBlock(user_id: number) {
  return axios.delete(`/api/user-relation/block/${user_id}`);
}

export type { Block };
export { getBlockList, postBlock, deleteBlock };
