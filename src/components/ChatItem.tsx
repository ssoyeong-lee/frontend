import FlexBox from "@/layouts/FlexBox";
import NotificationDot from "./NotificationDot";

interface Props {
  title: string;
  isSelected?: boolean;
  isJoined?: boolean;
  onClick?: () => {};
  notiCount?: number;
}

export default function ChatItem({
  title,
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
      <div className={`font-bold ${!isJoined && "text-gray-400"}`} onClick={onClick}>
        {title}
      </div>
      <NotificationDot amount={notiCount} />
    </FlexBox>
  );
}
