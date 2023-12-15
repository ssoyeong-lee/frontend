import { OtherUserAbstract } from "@/api/users";
import NotificationDot from "@/components/NotificationDot";
import useChatInfo from "@/hooks/data/useChatInfo";
import { useMessage } from "@/hooks/data/useMessage";
import { useSocket } from "@/hooks/useSocket";
import FlexBox from "@/layouts/FlexBox";
import { sendDMRead } from "@/socket/directMessage";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface Props {
  data: OtherUserAbstract;
  isSelected?: boolean;
  notiCount?: number;
}

export default function FriendItem({ data, isSelected, notiCount = 0 }: Props) {
  const { socket } = useSocket();
  const { changeSelected } = useChatInfo();
  const { setDMUnreadCount } = useMessage();
  const itemClick = async () => {
    try {
      console.log("data:", data);
      await changeSelected(data.id);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (typeof axiosError.response?.data.message === "object")
        toast.error(axiosError.response?.data.message[0]);
      else toast.error(axiosError.response?.data.message);
    }
    sendDMRead(socket, data.id);
    setDMUnreadCount(data.id, 0);
  };
  return (
    <FlexBox
      className={`w-full justify-between p-2  cursor-pointer ${
        isSelected === true ? "bg-gray-600" : ""
      } hover:bg-gray-600`}
      onClick={itemClick}
    >
      <div
        className={`font-bold ${isSelected ? "text-white" : "text-gray-400"}`}
      >
        {data.nickname}
      </div>
      <NotificationDot amount={notiCount} />
    </FlexBox>
  );
}
