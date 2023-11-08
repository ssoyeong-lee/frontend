import FlexBox from "@/layouts/FlexBox";

interface Props {
  type: string;
  clickUser: React.MouseEventHandler<HTMLDivElement>;
  clickChannel: React.MouseEventHandler<HTMLDivElement>;
}

export default function ChatSwitch({type, clickUser, clickChannel}: Props) {

  const selectedStyle = "bg-purple-cyber text-white";
  const unselectedStyle = "text-gray-400 hover:text-white";
  const userStyle = type === "user" ? selectedStyle : unselectedStyle;
  const channelStyle = type === "channel" ? selectedStyle : unselectedStyle;
  return (
    <FlexBox className="w-full border-b-2 border-purple-cyber text-center">
      <div
        onClick={clickUser}
        className={`w-full py-1 font-bold text-xl cursor-pointer ${userStyle}`}
      >
        USER
      </div>
      <div
        onClick={clickChannel}
        className={`w-full py-1 font-bold text-xl cursor-pointer ${channelStyle}`}
      >
        CHANNEL
      </div>
    </FlexBox>
  );
}
