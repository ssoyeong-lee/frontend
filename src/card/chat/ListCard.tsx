import { Channel, getChannelList, joinChannel } from "@/api/channels";
import ChatItem from "@/components/ChatItem";
import NotificationDot from "@/components/NotificationDot";
import SquareButton from "@/components/button/SquareButton";
import ChatSwitch from "@/components/chat/ChatSwitch";
import ChannelCreateModal from "@/components/modal/ChannelCreateModal";
import { chatId, chatList, mode, updateChannelList } from "@/hooks/useChannelInfo";
import { useModal } from "@/hooks/useModal";
import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";
import { useAtom } from "jotai";
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

  const [type, setType] = useAtom(mode);
  const [selectedId, setSelectedId] = useAtom(chatId);
  const [channelList, setChannelList] = useAtom(chatList);
  const [, updateChannel] = useAtom(updateChannelList);

  const clickUser = () => {
    setType("user");
    setSelectedId(0);
  };

  const clickChannel = async () => {
    setType("channel");
    const tmp = await getChannelList();
    setSelectedId(0);
    updateChannel();
  };

  const dmNode = dmList.map((user, idx) => {
    return (
      <ChatItem
        key={user.id}
        title={user.title}
        isSelected={user.id === selectedId ? true : false}
        onClick={async () => {
          setSelectedId(user.id);
        }}
      />
    );
  });

  const channelNode = channelList.map((channel) => {
    if (channel.type !== "private")
      return (
        <ChatItem
          key={channel.id}
          title={channel.title}
          isSelected={channel.id === selectedId ? true : false}
          onClick={async () => {
            setSelectedId(channel.id);
          }
        }
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
