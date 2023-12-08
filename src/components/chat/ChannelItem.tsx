import { leaveChannel } from "@/api/channels";
import useChatInfo, { ChannelInfoType } from "@/hooks/data/useChatInfo";
import { useModal } from "@/hooks/display/useModal";
import FlexBox from "@/layouts/FlexBox";
import NotificationDot from "../NotificationDot";
import PasswordModal from "../modal/PasswordModal";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface buttonProps {
  id: number;
}

function LeaveButton({ id }: buttonProps) {
  const { changeId } = useChatInfo();
  const leaveClick = async (e: React.MouseEvent) => {
    try {
      await leaveChannel(id);
      await changeId(null);
      console.log("leave channel");
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.status);
    }
    e.stopPropagation();
  };
  return (
    <button
      onClick={leaveClick}
      className="text-xs font-semibold px-2 py-1 border-[1.5px] border-deepred-cyber hover:bg-deepred-cyber hover:text-black"
    >
      Leave
    </button>
  );
}

interface Props {
  data: ChannelInfoType;
  isSelected?: boolean;
  isJoined?: boolean;
  notiCount?: number;
}

export default function ChannelItem({
  data,
  isSelected,
  isJoined,
  notiCount = 0,
}: Props) {
  const { openModal } = useModal();
  const { changeId } = useChatInfo();
  const itemClick = async () => {
    try {
      await changeId(data.id);
      if (data.type === "protected" && data.role === null)
        openModal(<PasswordModal id={data.id} />);
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.status);
    }
  };
  return (
    <FlexBox
      className={`w-full justify-between p-2  cursor-pointer ${
        isSelected === true ? "bg-gray-600" : ""
      } hover:bg-gray-600`}
      onClick={itemClick}
    >
      <div className={`font-bold ${!isJoined && "text-gray-400"}`}>
        {data.title}
      </div>
      <NotificationDot amount={notiCount} />
      {isJoined && <LeaveButton id={data.id} />}
    </FlexBox>
  );
}
