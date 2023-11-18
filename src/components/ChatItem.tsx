import FlexBox from "@/layouts/FlexBox";
import NotificationDot from "./NotificationDot";

interface Props {
  title: string;
  isSelected?: boolean;
  onClick?: () => void;
  idx: number;
  notiCount?: number;
}

export default function ChatItem({
  title,
  isSelected,
  onClick,
  idx,
  notiCount = 0,
}: Props) {
  return (
    <FlexBox
      className={`w-full justify-between p-2 ${
        isSelected === true ? "bg-gray-600" : ""
      } hover:bg-gray-600 cursur-pointer`}
      key={idx}
    >
      <div className="font-bold" key={idx + "title"}>
        {title}
      </div>
      <NotificationDot amount={notiCount} key={idx + "noti"} />
    </FlexBox>
  );
}
