import { Channel, getChannelList, joinChannel, leaveChannel } from "@/api/channels";
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

  const [channelList, setChannelList] = useState<Channel[]>([]);
  const [type, setType] = useState<string>("user");
  const clickUser = () => {
    setType("user");
    leaveChannel(3).then((res)=>console.log(res)).catch((err)=>console.log(err));
  };
  const clickChannel = () => {
    setType("channel");
    getChannelList().then((res) => setChannelList(res.data));
    console.log("channelList", channelList);
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
            {channelList.map((channel, idx) => {
              if (channel.type !== "private")
                return (
                  <FlexBox className="w-full justify-between p-2 hover:bg-gray-600 cursur-pointer" key={idx}>
                    <div className="font-bold" key={idx + "div"}>{channel.title}</div>
                    <NotificationDot amount={0} key={idx+"noti"}/>
                  </FlexBox>
                );
            })}
          </FlexBox>
        )}
        <SquareButton onClick={onClick}>Create Channel</SquareButton>
      </FlexBox>
    </Card>
  );
}
