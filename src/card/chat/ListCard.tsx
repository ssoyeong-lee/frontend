import { Channel, getChannelList } from "@/api/channels";
import ChatItem from "@/components/ChatItem";
import NotificationDot from "@/components/NotificationDot";
import SquareButton from "@/components/button/SquareButton";
import ChatSwitch from "@/components/chat/ChatSwitch";
import ChannelCreateModal from "@/components/modal/ChannelCreateModal";
import { useModal } from "@/hooks/useModal";
import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";
import { ReactNode, useState } from "react";

const dmList = [
  {
    title: "user1",
  },
  {
    title: "user2",
  },
  {
    title: "user3",
  },
  {
    title: "user4",
  },
];

export default function ListCard() {
  const { openModal, closeModal } = useModal();
  const onClick = () => {
    openModal(<ChannelCreateModal closeModal={onClickClose} />);
  };

  const onClickClose = async () => {
    closeModal();
    const tmp = await getChannelList();
    setChannelList(tmp.data);
  };

  const [channelList, setChannelList] = useState<Channel[]>([]);
  const [type, setType] = useState<string>("user");
  const clickUser = () => {
    setType("user");
    setSelectedIdx(0);
  };

  const clickChannel = async () => {
    setType("channel");
    const tmp = await getChannelList();
    setChannelList(tmp.data);
    console.log("channelList", channelList);
    setSelectedIdx(0);
  };

  const [selectedIdx, setSelectedIdx] = useState(0);

  const dmNode = dmList.map((user, idx) => {
      return (
        <ChatItem
          title={user.title}
          isSelected={idx === selectedIdx ? true : false}
          idx={idx}
        />
      );
  });

  const channelNode = channelList.map((channel, idx) => {
    if (channel.type !== "private")
      return (
        <ChatItem
          title={channel.title}
          isSelected={idx === selectedIdx ? true : false}
          idx={idx}
        />
      );
  });

  return (
    <Card>
      <FlexBox direction="col" className="w-full h-full gap-3">
        <ChatSwitch
          type={type}
          clickUser={clickUser}
          clickChannel={clickChannel}
        />
        <FlexBox direction="col" className="h-full w-full gap-3">
          {type === "user"? dmNode: channelNode}
        </FlexBox>
        <SquareButton onClick={onClick}>Create Channel</SquareButton>
      </FlexBox>
    </Card>
  );
}
