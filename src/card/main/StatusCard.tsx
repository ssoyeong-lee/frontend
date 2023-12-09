import { UserDetail } from "@/api/users/index";
import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";

interface CoinDisplayProps {
  title: string;
  content: number | string;
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

export default function StatusCard({ user }: { user: UserDetail | null }) {
  const win =
    user?.matchHistorys?.map((history) => history.result === "win").length ?? 0;
  const lose =
    user?.matchHistorys?.map((history) => history.result === "loss").length ??
    0;
  let rank: "S" | "A" | "B" | "C" | "D" | "E" | "F" = "F";
  if (user?.ladderPoint !== undefined) {
    if (user?.ladderPoint >= 2000) rank = "S";
    else if (user?.ladderPoint >= 1500) rank = "A";
    else if (user?.ladderPoint >= 1000) rank = "B";
    else if (user?.ladderPoint >= 700) rank = "C";
    else if (user?.ladderPoint >= 500) rank = "D";
    else if (user?.ladderPoint >= 300) rank = "E";
    else rank = "F";
  }
  let width = (user?.ladderPoint ?? 0) / 2000;
  if (width > 1) width = 1;
  if (width < 0) width = 0;
  return (
    <Card>
      <FlexBox className="w-full gap-8" direction="col">
        <FlexBox className="w-full justify-between">
          <CoinDisplay title="Rank" content={rank} color="purple" />
          <CoinDisplay title="Win" content={win} color="blue" />
          <CoinDisplay title="Lose" content={lose} color="red" />
          <CoinDisplay
            title="Win Rate"
            content={(win * 100) / (win + lose) + "%"}
            color="green"
          />
        </FlexBox>
        <FlexBox className="w-full gap-2" direction="col">
          <div className="w-full text-start">Ladder</div>
          <FlexBox className="relative w-full h-[25px] justify-center drop-shadow-ba bg-gray-500 rounded-full">
            <div className="absolute w-full h-[25px]">
              <div
                className="h-full bg-sky-cyber rounded-full absolute"
                style={{ width: `${width * 100}%` }}
              ></div>
            </div>
            <div className="text-white text-sm font-bold z-[99]">
              {user?.ladderPoint} LP
            </div>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Card>
  );
}
