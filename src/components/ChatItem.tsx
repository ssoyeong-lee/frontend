import FlexBox from "@/layouts/FlexBox";
import NotificationDot from "./NotificationDot";
import useChatInfo from "@/hooks/data/useChatInfo";
import { leaveChannel } from "@/api/channels";

interface buttonProps {
  id: number;
}


function LeaveButton({id}: buttonProps){
  const { updateList} = useChatInfo();
  const leaveClick = (e: React.MouseEvent)=>{
  leaveChannel(id);
  updateList("CM");
  console.log("lev")
  e.stopPropagation();
  }
  return (
    <button onClick={leaveClick} className="text-xs font-semibold px-2 py-1 border-[1.5px] border-deepred-cyber hover:bg-deepred-cyber hover:text-black">
      Leave
    </button>
  );
}

interface Props {
  title: string;
  id: number;
  isSelected?: boolean;
  isJoined?: boolean;
  onClick?: () => {};
  notiCount?: number;
}

export default function ChatItem({
  title,
  id,
  isSelected,
  isJoined,
  onClick,
  notiCount = 0,
}: Props) {

  return (
    <FlexBox
      className={`w-full justify-between p-2  cursor-pointer ${
        isSelected === true ? "bg-gray-600" : ""
      } hover:bg-gray-600`}
      onClick={onClick}
    >
      <div className={`font-bold ${!isJoined && "text-gray-400"}`}>{title}</div>
      {isJoined && (<LeaveButton id={id} />)}
      <NotificationDot amount={notiCount} />
    </FlexBox>
  );
}
