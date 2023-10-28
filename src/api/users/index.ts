import { api } from "@/api/network";
import { AxiosResponse } from "axios";

interface UserAbstract {
  id: number;
  nickname: string;
  ladderPoint: number;
  avatar: string;
}
async function getUserList(): Promise<AxiosResponse<UserAbstract[]>> {
  return api.get("/users");
}

interface UserDetail {
  email: string;
  nickname: string;
  ladderPoint: number;
  avatar: string;
  bio: string | null;
}

async function getUser(id: number): Promise<AxiosResponse<UserDetail[]>> {
  return api.get(`/users/${id}`);
}

export { getUserList, getUser };
