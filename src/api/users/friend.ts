import axios, { AxiosResponse } from "axios";

interface Friend {
  id: number;
  nickname: string;
}
async function getFriendList(): Promise<AxiosResponse<Friend[]>> {
  return axios.get("/api/users/friends");
}

async function postRequestFriend(id: number): Promise<AxiosResponse> {
  return axios.post(`/api/users/friends/request/${id}`);
}

export { getFriendList, postRequestFriend };
export type { Friend };
