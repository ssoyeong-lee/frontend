import { NotiChannelInvite } from "@/socket/notification";

interface ChannelInviteToastProps {
  noti: NotiChannelInvite;
}

export default function ChannelInviteToast({ noti }: ChannelInviteToastProps) {
  return (
    <div>
      <span>{noti.channel.title}</span>
      <span>님이 채널 초대를 보냈습니다.</span>
    </div>
  );
}
