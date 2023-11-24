import ScrollBox from "@/layouts/ScrollBox";
import { atom, useAtom } from "jotai";

const notificationAtom = atom<JSX.Element>(<></>);

interface NotificationTemplateProps {
  content: JSX.Element;
  onClose: () => void;
}

//notification component
function NotificationTemplate({ content, onClose }: NotificationTemplateProps) {
  return (
    <div onClick={onClose} className="fixed z-[101] inset-0">
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed top-28 right-0 bg-gray-500 w-[500px] h-fit max-h-[200px]"
      >
        <ScrollBox className="w-full h-fit max-h-[200px] overflow-auto gap-3 p-3">
          {content}
        </ScrollBox>
      </div>
    </div>
  );
}

interface UseNotificationType {
  notification: null | JSX.Element;
  openNotification: (RC: JSX.Element) => void;
  closeNotification: () => void;
}

function useNotification(): UseNotificationType {
  const [notification, setNotification] = useAtom(notificationAtom);
  const openNotification = (RC: JSX.Element) => {
    setNotification(
      <NotificationTemplate content={RC} onClose={closeNotification} />
    );
  };
  const closeNotification = () => {
    setNotification(<></>);
  };
  return { notification, openNotification, closeNotification };
}

export { useNotification };
