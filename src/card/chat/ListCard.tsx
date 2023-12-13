import SquareButton from "@/components/button/SquareButton";
import ChannelItem from "@/components/chat/ChannelItem";
import ChatSwitch from "@/components/chat/ChatSwitch";
import FriendItem from "@/components/chat/FriendItem";
import ChannelCreateModal from "@/components/modal/ChannelCreateModal";
import useChatInfo from "@/hooks/data/useChatInfo";
import { useMessage } from "@/hooks/data/useMessage";
import { useModal } from "@/hooks/display/useModal";
import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";
import ScrollBox from "@/layouts/ScrollBox";
import { useEffect } from "react";

export default function ListCard() {
  const { openModal } = useModal();
  const { chatInfo, changeType, updateInfo } = useChatInfo();
  const { DMData, CMData } = useMessage();

  const createClick = () => {
    openModal(<ChannelCreateModal />);
  };
  const clickUser = () => {
    changeType("DM");
    console.log(chatInfo.type);
  };
  const clickChannel = () => {
    changeType("CM");
    console.log(chatInfo);
  };

  useEffect(() => {
    updateInfo(chatInfo.type);
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
                        friend.id === chatInfo.selected?.id ? true : false
                      }
                      notiCount={DMData[friend.id]?.unreadCount ?? 0}
                    />
                  );
                })
              : chatInfo.channelList.map((channel, idx) => {
                  if (channel.type !== "private" || channel.role !== null)
                    return (
                      <ChannelItem
                        key={idx}
                        data={channel}
                        isSelected={channel.id === chatInfo.selected?.id ? true : false}
                        isJoined={channel.role !== null ? true : false}
                        notiCount={CMData[channel.id]?.unreadCount ?? 0}
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
