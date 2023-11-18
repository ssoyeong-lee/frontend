import axios, { AxiosResponse } from "axios";

interface Friend {
  nickname: string;
  otherUserId: number;
  status: "friend" | "pendingApproval" | "friendRequest";
}
async function getFriendList(): Promise<AxiosResponse<Friend[]>> {
  return axios.get("/api/user-relation/friends");
}

async function postRequestFriend(id: number): Promise<AxiosResponse> {
  return axios.post(`/api/user-relation/friends/${id}/request`, {});
}

async function approveFriend(id: number): Promise<AxiosResponse> {
  return axios.put(`/api/user-relation/friends/${id}/accept`, {});
}

async function denyFriend(id: number): Promise<AxiosResponse> {
  return axios.delete(`/api/user-relation/friends/${id}/reject`);
}

async function deleteFriend(id: number): Promise<AxiosResponse> {
  return axios.delete(`/api/user-relation/friends/${id}/disconnect`);
}

export {
  getFriendList,
  postRequestFriend,
  approveFriend,
  denyFriend,
  deleteFriend,
};
export type { Friend };
