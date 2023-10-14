import FlexBox from "@/layouts/FlexBox";

function MyChat() {
  return (
    <FlexBox className="w-full justify-end py-2">
      <div className="text-white">Hello, world!</div>
    </FlexBox>
  );
}

function OtherChat() {
  return (
    <FlexBox className="w-full gap-6 py-2">
      <div className="w-[100px] font-bold">NICKNAME</div>
      <div className="text-white">Hello, world!</div>
    </FlexBox>
  );
}

export default function ChatDisplay() {
  return (
    <FlexBox direction="col" className="w-full h-full">
      <MyChat />
      <OtherChat />
    </FlexBox>
  );
}
