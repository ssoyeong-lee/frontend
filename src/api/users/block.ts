import { OtherUserAbstract } from "@/api/users/index";
import axios, { AxiosResponse } from "axios";

async function getBlockList(): Promise<AxiosResponse<OtherUserAbstract[]>> {
  return axios.get("/api/user-relation/block");
}

async function postBlock(user_id: number) {
  return axios.post(`/api/user-relation/block/${user_id}`, {});
}

async function deleteBlock(user_id: number) {
  return axios.delete(`/api/user-relation/block/${user_id}`);
}

export { getBlockList, postBlock, deleteBlock };
