import SpinningLoad from "@/components/SpinningLoad";
import FlexBox from "@/layouts/FlexBox";

export default function GameLoader() {
  return (
    <FlexBox className="gap-8">
      <SpinningLoad />
      <div className="text-xl font-bold">Looking For match...</div>
    </FlexBox>
  );
}
