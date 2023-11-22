import { Channel, getChannelList, joinChannel } from "@/api/channels";
import ChatItem from "@/components/ChatItem";
import NotificationDot from "@/components/NotificationDot";
import SquareButton from "@/components/button/SquareButton";
import ChatSwitch from "@/components/chat/ChatSwitch";
import ChannelCreateModal from "@/components/modal/ChannelCreateModal";
import { useModal } from "@/hooks/useModal";
import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

const dmList = [
  {
    id: 1,
    title: "user1",
  },
  {
    id: 2,
    title: "user2",
  },
  {
    id: 3,
    title: "user3",
  },
  {
    id: 4,
    title: "user4",
  },
];

interface Props {
	type: string;
	setType: Dispatch<SetStateAction<string>>;
	selectedId: number;
	setSelectedId: Dispatch<SetStateAction<number>>;
};

export default function ListCard({type, setType, selectedId, setSelectedId}: Props) {
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
  const clickUser = () => {
    setType("user");
    setSelectedId(0);
  };

  const clickChannel = async () => {
    setType("channel");
    const tmp = await getChannelList();
    setChannelList(tmp.data);
    console.log("channelList", channelList);
    setSelectedId(0);
  };

  const dmNode = dmList.map((user, idx) => {
    return (
      <ChatItem
        title={user.title}
        isSelected={user.id === selectedId ? true : false}
        idx={idx}
		onClick={()=>{
			setSelectedId(user.id);
		}}
      />
    );
  });

  const channelNode = channelList.map((channel, idx) => {
    if (channel.type !== "private")
      return (
        <ChatItem
          title={channel.title}
          isSelected={channel.id === selectedId ? true : false}
          idx={idx}
          onClick={async () => {
            setSelectedId(channel.id);
            // await joinChannel(channel.id);
          }}
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
          {type === "user" ? dmNode : channelNode}
        </FlexBox>
        {type === "user" ? (
          ""
        ) : (
          <SquareButton onClick={onClick}>Create Channel</SquareButton>
        )}
      </FlexBox>
    </Card>
  );
}
