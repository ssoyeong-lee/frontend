import FlexBox from "@/layouts/FlexBox";
import { createContext, useContext, useState } from "react";

//context 생성
interface NotificationContextType {
  notification: null | React.ReactNode;
  openNotification: (RC: React.ReactNode) => void;
  closeNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notification: null,
  openNotification: () => {},
  closeNotification: () => {},
});

interface NotificationTemplateProps {
  content: React.ReactNode;
  onClose: () => void;
};

//notification component
function NotificationTemplate({content, onClose}: NotificationTemplateProps){
  return (
    <div onClick={onClose} className="fixed z-[101] inset-0">
      <div onClick={(e)=>e.stopPropagation()} className="fixed top-28 right-0 bg-gray-500 w-[500px] h-fit max-h-[200px]">
        <FlexBox direction="row" className="w-full h-fit max-h-[200px] overflow-auto gap-[12px] p-[12px]">
          {content}
        </FlexBox>
      </div>
    </div>
  )
}
//noti 구현:state
function NotificationImplement() {
  const [notification, setNotification] = useState<React.ReactNode>(<></>);
  const closeNotification = () => {
    setNotification(<></>);
    console.log("closeNotification");
  };
  const openNotification = (RC: React.ReactNode) => {
    setNotification(<NotificationTemplate content={RC} onClose={closeNotification} />);
    console.log("openNotification");
  };
  return { notification, openNotification, closeNotification };
}

//context 제공
function NotificationProvider({ children }: { children: JSX.Element }) {
  const noti = NotificationImplement();
  return (
    <NotificationContext.Provider value={noti}>
      {children}
      {noti.notification}
    </NotificationContext.Provider>
  );
}

//context 사용
function useNotification() {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  return context;
}

export { useNotification, NotificationProvider };
