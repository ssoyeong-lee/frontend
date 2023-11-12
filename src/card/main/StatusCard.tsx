import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";

interface CoinDisplayProps {
  title: string;
  content: string;
  color: "purple" | "blue" | "green" | "red";
}

function CoinDisplay({ title, content, color }: CoinDisplayProps) {
  let colorStyle = "";
  let textStyle = "text-2xl";
  switch (color) {
    case "purple":
      colorStyle = "bg-purple-cyber";
      textStyle = "text-4xl font-bold";
      break;
    case "blue":
      colorStyle = "border-4 border-blue-cyber bg-black drop-shadow-blue";
      break;
    case "green":
      colorStyle = "border-4 border-green-cyber bg-black drop-shadow-green";
      break;
    case "red":
      colorStyle = "border-4 border-red-cyber bg-black drop-shadow-red";
      break;
  }
  return (
    <FlexBox className="gap-4" direction="col">
      <div className="text-lg">{title}</div>
      <FlexBox
        className={`justify-center w-[100px] h-[100px] rounded-full ${colorStyle}`}
      >
        <div className={textStyle}>{content}</div>
      </FlexBox>
    </FlexBox>
  );
}

export default function StatusCard() {
  return (
    <Card>
      <FlexBox className="w-full gap-8" direction="col">
        <FlexBox className="w-full justify-between">
          <CoinDisplay title="Rank" content="A+" color="purple" />
          <CoinDisplay title="Win" content="12" color="blue" />
          <CoinDisplay title="Lose" content="8" color="red" />
          <CoinDisplay title="Win Rate" content="56%" color="green" />
        </FlexBox>
        <FlexBox className="w-full gap-2" direction="col">
          <div className="w-full text-start">Ladder</div>
          <FlexBox className="w-full h-[25px] bg-sky-cyber rounded-full justify-center drop-shadow-bar">
            <div className="text-black text-sm font-bold">2000 LP</div>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Card>
  );
}
