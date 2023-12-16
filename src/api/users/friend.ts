import { OtherUserAbstract } from "@/api/users/index";
import axios, { AxiosResponse } from "axios";

interface Friend {
  otherUser: {
    id: number;
    nickname: string;
  };
  status: "friend" | "pendingApproval" | "friendRequest";
}

async function getFriendList(): Promise<AxiosResponse<OtherUserAbstract[]>> {
  return axios.get("/api/user-relation/friends");
}

async function getFriendRelationList(): Promise<AxiosResponse<Friend[]>> {
  return axios.get("/api/user-relation/friends/relations");
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
  getFriendRelationList,
  postRequestFriend,
  approveFriend,
  denyFriend,
  deleteFriend,
};
export type { Friend };
