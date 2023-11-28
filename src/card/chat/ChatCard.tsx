import ChatDisplay from "@/components/chat/ChatDisplay";
import IconInput from "@/components/control/IconInput";
import ChannelInfoModal from "@/components/modal/ChannelInfoModal";
import ChatroomSettinngModal from "@/components/modal/ChatroomSettingModal";
import useChatInfo from "@/hooks/data/useChatInfo";
import { useModal } from "@/hooks/display/useModal";
import { useSocket } from "@/hooks/useSocket";
import Card from "@/layouts/Card";
import Divider from "@/layouts/Divider";
import FlexBox from "@/layouts/FlexBox";
import Icon from "@/layouts/Icon";
import { sendDM } from "@/socket/directMessage";
import { useState } from "react";

function ChatCardTop() {
  const { openModal } = useModal();
  const { chatInfo } = useChatInfo();
  const channelInfoClick = () => {
    openModal(<ChannelInfoModal />);
  };
  const settingClick = () => {
    openModal(<ChatroomSettinngModal />);
  };
  return (
    <FlexBox className="w-full justify-between">
      <div>{chatInfo.type === "DM" ? "Direct message" : "Channel"}</div>
      {chatInfo.id !== null && (
        <FlexBox className="gap-3">
          <div>
            {chatInfo.type === "DM"
              ? "user name"
              : chatInfo.list[chatInfo.id].title}
          </div>
          {chatInfo.type === "CM" && (
            <>
              <Icon
                src="/icon/blockList.svg"
                onClick={channelInfoClick}
                className="w-6 h-6"
                alt="name"
              />
              <Icon
                src="/icon/setting.svg"
                onClick={settingClick}
                className="w-6 h-6"
                alt="name"
              />
            </>
          )}
        </FlexBox>
      )}
    </FlexBox>
  );
}

export default function ChatCard() {
  const { socket } = useSocket();

  const [msg, setMsg] = useState("");
  const msgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  };
  const msgSend = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    sendDM(socket, 2, msg);
    setMsg("");
  };

  return (
    <Card>
      <FlexBox direction="col" className="w-full h-full gap-6">
        <ChatCardTop />
        <Divider color="yellow" />
        {/* <ChatDisplay /> */}
        <IconInput
          src="/icon/send.png"
          placeholder="type message"
          className="border border-white"
          value={msg}
          onChange={msgChange}
          onKeyPress={msgSend}
        />
      </FlexBox>
    </Card>
  );
}
