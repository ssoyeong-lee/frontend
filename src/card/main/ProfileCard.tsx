import ChipButton from "@/components/button/ChipButton";
import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";

export default function ProfileCard() {
  return (
    <Card>
      <FlexBox className="w-full gap-6" direction="col">
        <FlexBox className="w-full justify-between">
          <div className="text-2xl font-bold">Status</div>
          <div className="text-2xl font-bold text-green-cyber">online</div>
        </FlexBox>
        <FlexBox className="w-full justify-between">
          <div>
            <div className="text-5xl font-bold">hello</div>
            <div>sryou@gmail.com</div>
          </div>
          <div>이미지</div>
        </FlexBox>
        <div className="w-full text-gray-300">Bio hello world I am sryou</div>
        <FlexBox className="w-full justify-between">
          <div className="font-bold">2 factor auth</div>
          <ChipButton color="white">OFF</ChipButton>
        </FlexBox>
      </FlexBox>
    </Card>
  );
}
