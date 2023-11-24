import ChatDisplay from "@/components/chat/ChatDisplay";
import IconInput from "@/components/control/IconInput";
import ChannelInfoModal from "@/components/modal/ChannelInfoModal";
import ChatroomSettinngModal from "@/components/modal/ChatroomSettingModal";
import { useModal } from "@/hooks/useModal";
import { useSocket } from "@/hooks/useSocket";
import Card from "@/layouts/Card";
import Divider from "@/layouts/Divider";
import FlexBox from "@/layouts/FlexBox";
import Icon from "@/layouts/Icon";
import { sendDM } from "@/socket/directMessage";
import { useState } from "react";

interface Props {
  type: string;
  selectedId: number;
}

function ChatCardTop({ type, selectedId }: Props){
  const { openModal, closeModal } = useModal();
  const channelInfoClick = () => {
    openModal(<ChannelInfoModal />);
  };

  const settingClick = () => {
    openModal(
      <ChatroomSettinngModal selectedId={selectedId} closeModal={closeModal} />
    );
  };
  return (
    (
      <FlexBox className="w-full justify-between">
        <div>{type === "user" ? "Direct message" : "Channel"}</div>
        <FlexBox className="gap-3">
          <div>{type === "user" ? "user name" : "channel name"}</div>
          {type === "user" ? (
            ""
          ) : (
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
      </FlexBox>
    )
  );
}

export default function ChatCard({ type, selectedId }: Props) {
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
        <ChatCardTop type={type} selectedId={selectedId}/>
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
