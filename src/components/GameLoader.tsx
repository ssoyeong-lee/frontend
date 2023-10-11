import FlexBox from "@/layouts/FlexBox";
import { MoonLoader } from "react-spinners";

export default function GameLoader({ isFinding }: { isFinding: boolean }) {
  return (
    <FlexBox className="gap-8">
      <MoonLoader
        color="#ffffff"
        loading={isFinding}
        size={30}
        speedMultiplier={0.4}
      />
      <div className="text-xl font-bold">Looking For match...</div>
    </FlexBox>
  );
}
