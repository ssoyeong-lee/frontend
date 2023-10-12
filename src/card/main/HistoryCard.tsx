import Card from "@/layouts/Card";
import Divider from "@/layouts/Divider";
import FlexBox from "@/layouts/FlexBox";

export default function HistoryCard() {
  return (
    <Card>
      <FlexBox className="w-full text-center gap-4" direction="col">
        <FlexBox className="w-full justify-between">
          <div className="w-2/12 text-start">Date</div>
          <div className="w-1/12">Opposite</div>
          <div className="w-1/12">Type</div>
          <div className="w-1/12">Score</div>
          <div className="w-1/12">Outcome</div>
          <div className="w-1/12">Ladder</div>
        </FlexBox>
        <Divider />
        <FlexBox className="w-full justify-between">
          <div className="w-2/12 text-start">22-09-2021 21:00:32</div>
          <div className="w-1/12">ryou73</div>
          <div className="w-1/12">Ladder</div>
          <div className="w-1/12">5:3</div>
          <div className="w-1/12">Win</div>
          <div className="w-1/12">+30</div>
        </FlexBox>
      </FlexBox>
    </Card>
  );
}
