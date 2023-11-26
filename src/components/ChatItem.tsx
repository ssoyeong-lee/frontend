import FlexBox from "@/layouts/FlexBox";
import NotificationDot from "./NotificationDot";

interface Props {
  title: string;
  isSelected?: boolean;
  onClick?: () => {};
  notiCount?: number;
}

export default function ChatItem({
  title,
  isSelected,
  onClick,
  notiCount = 0,
}: Props) {
  return (
    <FlexBox
      className={`w-full justify-between p-2 ${
        isSelected === true ? "bg-gray-600" : ""
      } hover:bg-gray-600 cursur-pointer`}
      onClick={onClick}
    >
      <div className="font-bold" onClick={onClick}>
        {title}
      </div>
      <NotificationDot amount={notiCount} />
    </FlexBox>
  );
}
