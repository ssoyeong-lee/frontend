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
      <FlexBox className="w-full gap-6" direction="col">
        <FlexBox className="w-full justify-between">
          <CoinDisplay title="Rank" content="A+" color="purple" />
          <CoinDisplay title="Rank" content="A+" color="blue" />
          <CoinDisplay title="Rank" content="A+" color="red" />
          <CoinDisplay title="Rank" content="A+" color="green" />
        </FlexBox>
        <div className="w-full">
          <div>Ladder</div>
          <div className="w-full h-[20px] bg-blue-cyber"></div>
        </div>
      </FlexBox>
    </Card>
  );
}
