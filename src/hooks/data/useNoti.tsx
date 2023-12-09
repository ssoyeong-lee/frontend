import Toast from "@/components/toast/index";
import { Notification, NotificationType } from "@/socket/notification";
import { atom, useAtom } from "jotai";
import { toast } from "react-toastify";

const notiListAtom = atom<Notification<NotificationType>[]>([]);

interface UseNotiType {
  notiList: Notification<NotificationType>[];
  setNoti: (notiData: Notification<NotificationType>) => void;
  setNotiList: (notiList: Notification<NotificationType>[]) => void;
  removeNoti: (idx: number) => void;
}

function useNoti(): UseNotiType {
  const [notiList, setNotiList] = useAtom(notiListAtom);
  const setNoti = (notiData: Notification<NotificationType>) => {
    setNotiList((prev) => [...prev, notiData]);
    toast.info(<Toast noti={notiData} />);
  };
  const removeNoti = (idx: number) => {
    setNotiList((prev) => prev.filter((_, i) => i !== idx));
  };
  return { notiList, setNoti, setNotiList, removeNoti };
}

export { useNoti };
