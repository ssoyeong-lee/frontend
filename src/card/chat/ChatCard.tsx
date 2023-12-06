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
import { sendCM } from "@/socket/channelMessage";
import { sendDM } from "@/socket/directMessage";
import React, { useState } from "react";

interface Props {
  setIsSearch: (isSearch: boolean) => void;
}

function ChatCardTop({ setIsSearch }: Props) {
  const { openModal } = useModal();
  const { chatInfo } = useChatInfo();
  const inviteClick = (e: React.MouseEvent) => {
    setIsSearch(true);
    console.log("inviteClick");
    e.stopPropagation();
  };
  const channelInfoClick = () => {
    openModal(<ChannelInfoModal />);
  };
  const settingClick = () => {
    openModal(<ChatroomSettinngModal />);
  };
  return (
    <FlexBox className="w-full justify-between">
      <div>{chatInfo.type === "DM" ? "Direct message" : "Channel"}</div>
      {chatInfo.index !== null && (
        <FlexBox className="gap-3">
          <div>
            {chatInfo.type === "DM"
              ? chatInfo.friendList[chatInfo.index]?.nickname
              : chatInfo.channelList[chatInfo.index]?.title}
          </div>
          {chatInfo.type === "CM" &&
            chatInfo.channelList[chatInfo.index].type === "private" && (
              <Icon
                src="/icon/mail.svg"
                onClick={inviteClick}
                className="w-6 h-6"
                alt="invite"
              />
            )}
          {chatInfo.type === "CM" && (
            <Icon
              src="/icon/info.svg"
              onClick={channelInfoClick}
              className="w-6 h-6"
              alt="name"
            />
          )}
          {chatInfo.role === "Owner" && (
            <Icon
              src="/icon/setting.svg"
              onClick={settingClick}
              className="w-6 h-6"
              alt="name"
            />
          )}
        </FlexBox>
      )}
    </FlexBox>
  );
}

export default function ChatCard({ setIsSearch }: Props) {
  const { socket } = useSocket();
  const { chatInfo } = useChatInfo();
  const [msg, setMsg] = useState("");

  const msgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  };
  const msgSend = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (chatInfo.type === "DM" && chatInfo.id != null)
      sendDM(socket, chatInfo.id, msg);
    else if (chatInfo.type === "CM" && chatInfo.id != null)
      sendCM(socket, chatInfo.id, msg);
    setMsg("");
  };

  return (
    <Card>
      <FlexBox direction="col" className="w-full h-full gap-6">
        <ChatCardTop setIsSearch={setIsSearch} />
        <Divider color="yellow" />
        <ChatDisplay />
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
