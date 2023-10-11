import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";

export default function OptionCard() {
  const selectedStyle = "text-white";
  const unselectedStyle = "text-gray-400 hover:text-white";
  return (
    <Card>
      <FlexBox
        className="text-2xl font-bold text-center gap-12"
        direction="col"
      >
        <div className="text-4xl">Option</div>
        <FlexBox className="w-full justify-between">
          <div>SPEED</div>
          <FlexBox>
            <div className={`w-[150px] ${selectedStyle}`}>Normal</div>
            <div className={`w-[150px] ${unselectedStyle}`}>Fast</div>
          </FlexBox>
        </FlexBox>
        <FlexBox className="w-full justify-between">
          <div>MODE</div>
          <FlexBox>
            <div className={`w-[150px] ${selectedStyle}`}>Standard</div>
            <div className={`w-[150px] ${unselectedStyle}`}>Extreme</div>
          </FlexBox>
        </FlexBox>
        <FlexBox className="w-full justify-between">
          <div>TYPE</div>
          <FlexBox>
            <div className={`w-[150px] ${selectedStyle}`}>Ladder</div>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Card>
  );
}
