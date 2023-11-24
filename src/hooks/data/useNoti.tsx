import { Notification, NotificationType } from "@/socket/notification";
import { atom, useAtom } from "jotai";

const notiListAtom = atom<Notification<NotificationType>[]>([]);

interface UseNotiType {
  notiList: Notification<NotificationType>[];
  setNoti: (notiData: Notification<NotificationType>) => void;
}

function useNoti(): UseNotiType {
  const [notiList, setNotiList] = useAtom(notiListAtom);
  const setNoti = (notiData: Notification<NotificationType>) => {
    setNotiList((prev) => [...prev, notiData]);
  };
  return { notiList, setNoti };
}

export { useNoti };
