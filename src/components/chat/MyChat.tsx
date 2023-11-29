import FlexBox from "@/layouts/FlexBox";

function MyChat({ content }: { content: string }) {
  return (
    <FlexBox className="w-full justify-end py-2">
      <div className="text-white">{content}</div>
    </FlexBox>
  );
}

export default MyChat;
