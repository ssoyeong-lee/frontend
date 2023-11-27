import { NotiFriendRequest } from "@/socket/notification";

interface FriendRequestAlarmProps {
  noti: NotiFriendRequest;
}

export default function FriendRequestAlarm({ noti }: FriendRequestAlarmProps) {
  return (
    <div>
      <span>{noti.requestingUser.nickname}</span>
      <span>님이 친구 초대를 보냈습니다.</span>
    </div>
  );
}
