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
  id: number;
  email: string;
  nickname: string;
  ladderPoint: number;
  avatar: 0 | 1 | 2 | 3 | 4;
  bio: string | null;
  is2fa?: boolean;
}

async function getUserMe(): Promise<AxiosResponse<UserDetail>> {
  return axios.get("/api/users/me");
}

async function putUserMe(params: UserDetail): Promise<AxiosResponse> {
  return axios.put("/api/users/me", params);
}

async function getUser(id: number): Promise<AxiosResponse<UserDetail>> {
  return axios.get(`/api/users/${id}`);
}

export type { UserAbstract, UserDetail };
export { getUserList, getUserMe, putUserMe, getUser };
