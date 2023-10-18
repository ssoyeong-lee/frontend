import Avatar from "@/components/Avatar";
import FlexBox from "@/layouts/FlexBox";
import ModalCard from "@/layouts/ModalCard";

interface UserDisplayProps {
  src: string;
  nickname: string;
  lp: number;
  winRate: number;
  type: "enemy" | "user";
}

function UserDisplay({ src, nickname, lp, winRate, type }: UserDisplayProps) {
  const dropShadow = type === "enemy" ? "drop-shadow-red" : "drop-shadow-blue";
  return (
    <FlexBox
      className={`gap-9 p-6 rounded-2xl border-[3px] border-white bg-gray-700 ${dropShadow}`}
    >
      <Avatar src={src} />
      <FlexBox direction="col" className="w-[100px] gap-3">
        <div className="w-full">{nickname}</div>
        <div className="w-full">{lp} LP</div>
        <div className="w-full">{winRate} %</div>
      </FlexBox>
    </FlexBox>
  );
}

export default function MatchFoundModal() {
  return (
    <ModalCard>
      <div className="text-4xl font-bold mb-12 text-center">Match Found</div>
      <FlexBox className="gap-12">
        <UserDisplay
          src="/sample.png"
          nickname="soysoy"
          lp={1300}
          winRate={50}
          type="enemy"
        />
        <div className="text-4xl">vs</div>
        <UserDisplay
          src="/sample.png"
          nickname="sroyo"
          lp={900}
          winRate={10}
          type="user"
        />
      </FlexBox>
    </ModalCard>
  );
}
