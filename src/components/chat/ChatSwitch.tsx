import FlexBox from "@/layouts/FlexBox";

export default function ChatSwitch({ type }: { type: "user" | "channel" }) {
  const selectedStyle = "bg-purple-cyber text-white";
  const unselectedStyle = "text-gray-400 hover:text-white";
  const userStyle = type === "user" ? selectedStyle : unselectedStyle;
  const channelStyle = type === "channel" ? selectedStyle : unselectedStyle;
  return (
    <FlexBox className="w-full border-b-2 border-purple-cyber text-center">
      <div
        className={`w-full py-1 font-bold text-xl cursur-pointer ${userStyle}`}
      >
        USER
      </div>
      <div
        className={`w-full py-1 font-bold text-xl cursor-pointer ${channelStyle}`}
      >
        CHANNEL
      </div>
    </FlexBox>
  );
}
