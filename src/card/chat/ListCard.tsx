import SquareButton from "@/components/button/SquareButton";
import ChannelItem from "@/components/chat/ChannelItem";
import ChatSwitch from "@/components/chat/ChatSwitch";
import FriendItem from "@/components/chat/FriendItem";
import ChannelCreateModal from "@/components/modal/ChannelCreateModal";
import useChatInfo from "@/hooks/data/useChatInfo";
import { useModal } from "@/hooks/display/useModal";
import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";
import ScrollBox from "@/layouts/ScrollBox";
import { useEffect } from "react";

export default function ListCard() {
  const { openModal } = useModal();
  const { chatInfo, changeType, updateList } = useChatInfo();

  const createClick = () => {
    openModal(<ChannelCreateModal />);
  };
  const clickUser = () => {
    changeType("DM");
  };
  const clickChannel = () => {
    changeType("CM");
  };

  useEffect(() => {
    updateList(chatInfo.type);
  }, [chatInfo.type]);

  return (
    <Card>
      <FlexBox direction="col" className="w-full h-full gap-3">
        <ChatSwitch
          type={chatInfo.type}
          clickUser={clickUser}
          clickChannel={clickChannel}
        />
        <ScrollBox className="flex-1">
          <FlexBox direction="col" className="h-full w-full gap-3">
            {chatInfo.type === "DM"
              ? chatInfo.friendList.map((friend, idx) => {
                  return (
                    <FriendItem
                      key={idx}
                      data={friend}
                      isSelected={
                        friend.otherUserId === chatInfo.id ? true : false
                      }
                    />
                  );
                })
              : chatInfo.channelList.map((channel, idx) => {
                  if (channel.type !== "private" || channel.role !== null)
                    return (
                      <ChannelItem
                        key={idx}
                        data={channel}
                        isSelected={channel.id === chatInfo.id ? true : false}
                        isJoined={channel.role !== null ? true : false}
                      />
                    );
                })}
          </FlexBox>
        </ScrollBox>
        {chatInfo.type === "CM" && (
          <SquareButton onClick={createClick}>Create Channel</SquareButton>
        )}
      </FlexBox>
    </Card>
  );
}
