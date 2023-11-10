import { api } from "@/api/network";
import { AxiosResponse } from "axios";

interface Block {
  id: number;
  nickname: string;
}
async function getBlockList(): Promise<AxiosResponse<Block[]>> {
  return api.get("/user-relation/block");
}

async function postBlock(user_id: number) {
  return api.post(`/user-relation/block/${user_id}`);
}

async function deleteBlock(user_id: number) {
  return api.delete(`/user-relation/block/${user_id}`);
}

export type { Block };
export { getBlockList, postBlock, deleteBlock };
