import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";

export default function HowToPlayCard() {
  return (
    <Card>
      <FlexBox className="text-lg gap-12" direction="col">
        <div className="text-2xl font-bold">How To Play</div>
        <FlexBox className="w-full gap-8" direction="col">
          <div>공이 넘어가지 않도록 막아내세요!</div>
          <div>10에 먼저 도달하면 승리합니다 😉</div>
          <div>오른쪽 화면에서 옵션을 선택해보세요!</div>
          <div>더욱 더 재미있게 게임을 즐기실 수 있답니다</div>
          <div>게임에서 승리해 랭크를 올려보세요!</div>
        </FlexBox>
        <FlexBox className="w-full gap-4" direction="col">
          <div className="font-bold text-deepred-cyber">막대 조작법</div>
          <div className="w-full">⬅️ 막대가 왼쪽으로 이동합니다</div>
          <div className="w-full text-end">막대가 오른쪽으로 이동합니다 ➡️</div>
        </FlexBox>
      </FlexBox>
    </Card>
  );
}
