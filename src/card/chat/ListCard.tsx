import ChatItem from "@/components/ChatItem";
import SquareButton from "@/components/button/SquareButton";
import ChatSwitch from "@/components/chat/ChatSwitch";
import ChannelCreateModal from "@/components/modal/ChannelCreateModal";
import useChatInfo from "@/hooks/data/useChatInfo";
import { useModal } from "@/hooks/display/useModal";
import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";
import ScrollBox from "@/layouts/ScrollBox";

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
        title={user.title}
        isSelected={user.id === chatInfo.id ? true : false}
        onClick={async () => {
          changeId(user.id);
        }}
      />
    );
  });

  const channelNode = chatInfo.list.map((channel) => {
    if (channel.type !== "private")
      return (
        <ChatItem
          key={channel.id}
          title={channel.title}
          isSelected={channel.id === chatInfo.id ? true : false}
          onClick={async () => {
            changeId(channel.id);
          }}
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
