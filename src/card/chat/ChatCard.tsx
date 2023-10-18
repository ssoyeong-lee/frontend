import ChatDisplay from "@/components/chat/ChatDisplay";
import IconInput from "@/components/control/IconInput";
import Card from "@/layouts/Card";
import Divider from "@/layouts/Divider";
import FlexBox from "@/layouts/FlexBox";

export default function ChatCard() {
  return (
    <Card>
      <FlexBox direction="col" className="w-full h-full gap-6">
        <FlexBox className="w-full justify-between">
          <div>Direct message</div>
          <div>user121</div>
        </FlexBox>
        <Divider />
        <ChatDisplay />
        <IconInput
          src="/icon/send.png"
          placeholder="type message"
          className="border border-white"
        />
      </FlexBox>
    </Card>
  );
}
