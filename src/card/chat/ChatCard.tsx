import ChatDisplay from "@/components/chat/ChatDisplay";
import IconInput from "@/components/control/IconInput";
import BlockListModal from "@/components/modal/BlockListModal";
import ChatroomSettinngModal from "@/components/modal/ChatroomSettingModal";
import { useModal } from "@/hooks/useModal";
import Card from "@/layouts/Card";
import Divider from "@/layouts/Divider";
import FlexBox from "@/layouts/FlexBox";
import Icon from "@/layouts/Icon";
import { useState } from "react";

export default function ChatCard() {
  const { openModal } = useModal();
  const blockClick = () => {
    openModal(<BlockListModal />);
  };
  const settingClick = () => {
    openModal(<ChatroomSettinngModal />);
  };

  const [msg, setMsg] = useState("");
  const msgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);
  }
  return (
    <Card>
      <FlexBox direction="col" className="w-full h-full gap-6">
        <FlexBox className="w-full justify-between">
          <div>Direct message</div>
          <FlexBox className="gap-3">
            <div>user121</div>
            <Icon
              src="/icon/blockList.svg"
              onClick={blockClick}
              className="w-6 h-6"
              alt="name"
            />
            <Icon
              src="/icon/setting.svg"
              onClick={settingClick}
              className="w-6 h-6"
              alt="name"
            />
          </FlexBox>
        </FlexBox>
        <Divider color="yellow" />
        <ChatDisplay />
        <IconInput
          src="/icon/send.png"
          placeholder="type message"
          className="border border-white"
          value={msg}
          onChange={msgChange}
        />
      </FlexBox>
    </Card>
  );
}
