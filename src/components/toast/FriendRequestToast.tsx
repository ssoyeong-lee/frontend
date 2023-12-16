import { NotiFriendRequest } from "@/socket/notification";

interface FriendRequestToastProps {
  noti: NotiFriendRequest;
}

export default function FriendRequestToast({ noti }: FriendRequestToastProps) {
  return (
    <div>
      <span>{noti.requestingUser.nickname}</span>
      <span>님이 친구 초대를 보냈습니다.</span>
    </div>
  );
}
