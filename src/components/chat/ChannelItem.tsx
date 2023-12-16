import { joinChannel, leaveChannel } from "@/api/channels";
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
  const { changeSelected } = useChatInfo();
  const leaveClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await leaveChannel(id);
      await changeSelected(null);
      console.log("leave channel");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (typeof axiosError.response?.data.message === "object")
        toast.error(axiosError.response?.data.message[0]);
      else toast.error(axiosError.response?.data.message);
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
  const { changeSelected } = useChatInfo();
  const itemClick = async () => {
    try {
      if (data.type === "protected" && data.role === null)
        data.role === null && openModal(<PasswordModal id={data.id} />);
      else {
          data.role === null && (await joinChannel(data.id, ""));
          await changeSelected(data.id);
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (typeof axiosError.response?.data.message === "object")
        toast.error(axiosError.response?.data.message[0]);
      else toast.error(axiosError.response?.data.message);
      changeSelected(null);
    }
  };
  return (
    <FlexBox
      className={`w-full justify-between p-2  cursor-pointer ${
        isSelected === true ? "bg-gray-600" : ""
      } hover:bg-gray-600`}
      onClick={itemClick}
    >
      <div className={`w-fit h-fit font-bold ${!isJoined && "text-gray-400"}`}>
        {data.title}
      </div>
      <FlexBox className="w-fit h-fit justify-end gap-4">
        <NotificationDot amount={notiCount} />
        {isJoined && <LeaveButton id={data.id} />}
      </FlexBox>
    </FlexBox>
  );
}
