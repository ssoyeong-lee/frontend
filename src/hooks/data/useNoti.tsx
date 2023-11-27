import ChannelInviteToast from "@/components/toast/ChannelInviteToast";
import FriendRequestToast from "@/components/toast/FriendRequestToast";
import GameInviteToast from "@/components/toast/GameInviteToast";
import { useToast } from "@/hooks/display/useToast";
import {
  NotiChannelInvite,
  NotiFriendRequest,
  NotiGameInvite,
  Notification,
  NotificationType,
} from "@/socket/notification";
import { atom, useAtom } from "jotai";

const notiListAtom = atom<Notification<NotificationType>[]>([]);

interface UseNotiType {
  notiList: Notification<NotificationType>[];
  setNoti: (notiData: Notification<NotificationType>) => void;
  setNotiList: (notiList: Notification<NotificationType>[]) => void;
}

function useNoti(): UseNotiType {
  const { openToast } = useToast();
  const [notiList, setNotiList] = useAtom(notiListAtom);
  const setNoti = (notiData: Notification<NotificationType>) => {
    setNotiList((prev) => [...prev, notiData]);
    if (notiData.type === "game-invite")
      openToast(<GameInviteToast noti={notiData as NotiGameInvite} />);
    else if (notiData.type === "channel-invite")
      openToast(<ChannelInviteToast noti={notiData as NotiChannelInvite} />);
    else if (notiData.type === "friend-request")
      openToast(<FriendRequestToast noti={notiData as NotiFriendRequest} />);
  };
  return { notiList, setNoti, setNotiList };
}

export { useNoti };
