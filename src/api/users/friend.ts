import axios, { AxiosResponse } from "axios";

interface Friend {
  id: number;
  nickname: string;
}
async function getFriendList(): Promise<AxiosResponse<Friend[]>> {
  return axios.get("/api/user-relation/friends");
}

async function postRequestFriend(id: number): Promise<AxiosResponse> {
  return axios.post(`/api/user-relation/friends/${id}/request`, {});
}

export { getFriendList, postRequestFriend };
export type { Friend };
