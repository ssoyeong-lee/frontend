import ChatItem from "@/components/ChatItem";
import ChipButton from "@/components/button/ChipButton";
import SquareButton from "@/components/button/SquareButton";
import ChatSwitch from "@/components/chat/ChatSwitch";
import ChannelCreateModal from "@/components/modal/ChannelCreateModal";
import PasswordModal from "@/components/modal/PasswordModal";
import useChatInfo, { ChannelInfoType } from "@/hooks/data/useChatInfo";
import { useModal } from "@/hooks/display/useModal";
import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";
import ScrollBox from "@/layouts/ScrollBox";

const dmList = [];

export default function ListCard() {
  const { openModal } = useModal();
  const { chatInfo, changeType, changeId, updateList } = useChatInfo();

  const createClick = () => {
    openModal(<ChannelCreateModal />);
  };

  const clickUser = () => {
    changeType("DM");
    // updateList("DM");
  };

  const clickChannel = () => {
    changeType("CM");
    updateList("CM");
  };

  const dmNode = dmList.map((user, idx) => {
    return (
      <ChatItem
        key={user.id}
        data={user}
        isSelected={user.id === chatInfo.id ? true : false}
      />
    );
  });

  const channelNode = chatInfo.list.map((channel) => {
    if (channel.type !== "private" || channel.role !== null)
      return (
        <ChatItem
          key={channel.id}
          data={channel}
          isSelected={channel.id === chatInfo.id ? true : false}
          isJoined={channel.role !== null ? true : false}
        />
      );
  });

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
            {chatInfo.type === "CM" ? channelNode : dmNode}
          </FlexBox>
        </ScrollBox>
        {chatInfo.type === "CM" && (
          <SquareButton onClick={createClick}>Create Channel</SquareButton>
        )}
      </FlexBox>
    </Card>
  );
}
