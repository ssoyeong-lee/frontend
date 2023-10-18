import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";

export default function RankingCard() {
  return (
    <Card>
      <FlexBox className="h-full gap-8 text-xl" direction="col">
        <div className="font-bold">Ranking</div>
        <FlexBox className="w-full gap-6">
          <div className="text-3xl font-bold w-[60px]">#1</div>
          <div>Sryou</div>
        </FlexBox>
      </FlexBox>
    </Card>
  );
}
