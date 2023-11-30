import NotificationDot from "@/components/NotificationDot";
import useChatInfo, { FriendInfoType } from "@/hooks/data/useChatInfo";
import { useMessage } from "@/hooks/data/useMessage";
import { useSocket } from "@/hooks/useSocket";
import FlexBox from "@/layouts/FlexBox";
import { sendDMRead } from "@/socket/directMessage";

interface Props {
  data: FriendInfoType;
  isSelected?: boolean;
  notiCount?: number;
}

export default function FriendItem({ data, isSelected, notiCount = 0 }: Props) {
  const { socket } = useSocket();
  const { changeId } = useChatInfo();
  const { setDMUnreadCount } = useMessage();
  const itemClick = async () => {
    changeId(data.otherUserId);
    sendDMRead(socket, data.otherUserId);
    setDMUnreadCount(data.otherUserId, 0);
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