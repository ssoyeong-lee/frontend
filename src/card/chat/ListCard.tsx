import NotificationDot from "@/components/NotificationDot";
import ChatSwitch from "@/components/chat/ChatSwitch";
import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";

export default function ListCard() {
  return (
    <Card>
      <ChatSwitch type="channel" />
      <FlexBox direction="col" className="h-full w-full gap-3">
        <FlexBox className="w-full justify-between p-2 hover:bg-gray-600 cursur-pointer">
          <div className="font-bold">user1</div>
          <NotificationDot amount={1} />
        </FlexBox>
        <FlexBox className="w-full justify-between p-2 bg-gray-600 cursur-pointer">
          <div className="font-bold">user2</div>
          <NotificationDot amount={0} />
        </FlexBox>
      </FlexBox>
    </Card>
  );
}
