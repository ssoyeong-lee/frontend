import FlexBox from "@/layouts/FlexBox";

function MyChat({ content }: { content: string }) {
  return (
    <FlexBox className="w-full justify-end py-2">
      <div className="text-white">Hello, world!</div>
    </FlexBox>
  );
}

export default MyChat;
