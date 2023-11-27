import Toast from "@/components/toast/index";
import { useToast } from "@/hooks/display/useToast";
import { Notification, NotificationType } from "@/socket/notification";
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
    openToast(<Toast noti={notiData} />);
  };
  return { notiList, setNoti, setNotiList };
}

export { useNoti };
