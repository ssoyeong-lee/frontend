import { api } from "@/api/network";
import { AxiosResponse } from "axios";

interface Friend {
  id: number;
  nickname: string;
}
async function getFriendList(): Promise<AxiosResponse<Friend[]>> {
  return api.get("/users/friends");
}

async function postRequestFriend(id: number): Promise<AxiosResponse> {
  return api.post(`/users/friends/request/${id}`);
}

export { getFriendList, postRequestFriend };
export type { Friend };
