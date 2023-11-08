import NotificationDot from "@/components/NotificationDot";
import SquareButton from "@/components/button/SquareButton";
import ChatSwitch from "@/components/chat/ChatSwitch";
import ChannelCreateModal from "@/components/modal/ChannelCreateModal";
import { useModal } from "@/hooks/useModal";
import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";
import { useState } from "react";

export default function ListCard() {
  const { openModal } = useModal();
  const onClick = () => {
    openModal(<ChannelCreateModal />);
  };

  const [type, setType] = useState<string>("user");
  const clickUser = () => {
    setType("user");
  };
  const clickChannel = () => {
    setType("channel");
  };

  return (
    <Card>
      <FlexBox direction="col" className="w-full h-full gap-3">
        <ChatSwitch
          type={type}
          clickUser={clickUser}
          clickChannel={clickChannel}
        />
        {type === "user" ? (
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
        ) : (
          <FlexBox direction="col" className="h-full w-full gap-3">
            <FlexBox className="w-full justify-between p-2 hover:bg-gray-600 cursur-pointer">
              <div className="font-bold">channel1</div>
              <NotificationDot amount={1} />
            </FlexBox>
            <FlexBox className="w-full justify-between p-2 bg-gray-600 cursur-pointer">
              <div className="font-bold">channel2</div>
              <NotificationDot amount={0} />
            </FlexBox>
          </FlexBox>
        )}

        <SquareButton onClick={onClick}>Create Channel</SquareButton>
      </FlexBox>
    </Card>
  );
}
