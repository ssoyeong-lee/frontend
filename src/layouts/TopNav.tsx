import FlexBox from "@/layouts/FlexBox";
import Icon from "@/layouts/Icon";

export default function TopNav() {
  return (
    <FlexBox className="bg-cover-black-200 justify-between px-6 h-[120px] text-center">
      <div className="text-white text-5xl w-[200px]">PONG</div>
      <FlexBox className="gap-6 text-4xl">
        <div className="text-gray-400 w-[200px]">Play</div>
        <div className="text-gray-400 w-[200px]">User</div>
        <div className="text-gray-400 w-[200px]">Chat</div>
        <FlexBox className="gap-6">
          <Icon src="/icon/alarm.svg" alt="alarm" />
          <Icon src="/icon/logout.svg" alt="logout" />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
