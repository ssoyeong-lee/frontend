import { useUserControl } from "@/hooks/useUserControl";
import FlexBox from "@/layouts/FlexBox";

function MyChat() {
  return (
    <FlexBox className="w-full justify-end py-2">
      <div className="text-white">Hello, world!</div>
    </FlexBox>
  );
}

function OtherChat() {
  const { openUserControl } = useUserControl();
  return (
    <FlexBox className="w-full gap-6 py-2">
      <div
        className="w-[100px] font-bold cursor-pointer hover:text-lightblue-cyber"
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          console.log(target.getBoundingClientRect());
          openUserControl({
            x: target.getBoundingClientRect().x,
            y:
              target.getBoundingClientRect().y +
              target.getBoundingClientRect().height +
              5,
            type: "user",
          });
        }}
      >
        NICKNAME
      </div>
      <div className="text-white">Hello, world!</div>
    </FlexBox>
  );
}

export default function ChatDisplay() {
  return (
    <FlexBox direction="col" className="w-full h-full">
      <MyChat />
      <OtherChat />
      <OtherChat />
      <OtherChat />
      <OtherChat />
      <OtherChat />
      <OtherChat />
      <OtherChat />
      <OtherChat />
      <OtherChat />
      <OtherChat />
      <OtherChat />
      <OtherChat />
    </FlexBox>
  );
}
