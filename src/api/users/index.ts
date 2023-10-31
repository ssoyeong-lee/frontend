import axios, { AxiosResponse } from "axios";

interface UserAbstract {
  id: number;
  nickname: string;
  ladderPoint: number;
  avatar: string;
}
async function getUserList(): Promise<AxiosResponse<UserAbstract[]>> {
  return axios.get("/api/users");
}

interface UserDetail {
  email: string;
  nickname: string;
  ladderPoint: number;
  avatar: string;
  bio: string | null;
}

async function getUserMe(): Promise<AxiosResponse<UserDetail>> {
  return axios.get("/api/users/me");
}

async function getUser(id: number): Promise<AxiosResponse<UserDetail>> {
  return axios.get(`/api/users/${id}`);
}

export { getUserList, getUserMe, getUser };
