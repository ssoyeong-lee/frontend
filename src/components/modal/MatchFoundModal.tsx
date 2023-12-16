import { UserAbstract } from "@/api/users/index";
import Avatar from "@/components/Avatar";
import { GameStart, GameUserInfo } from "@/hooks/data/useGame";
import FlexBox from "@/layouts/FlexBox";
import ModalCard from "@/layouts/ModalCard";

interface UserDisplayProps {
  user: GameUserInfo & { info: UserAbstract };
  type: "enemy" | "user";
}

function UserDisplay({ user, type }: UserDisplayProps) {
  const dropShadow = type === "enemy" ? "drop-shadow-red" : "drop-shadow-blue";
  return (
    <FlexBox
      className={`gap-9 p-6 rounded-2xl border-[3px] border-white bg-gray-700 ${dropShadow}`}
    >
      <Avatar type={user.info.avatar} />
      <FlexBox direction="col" className="w-[100px] gap-3">
        <div className="w-full">{user.info.nickname}</div>
        <div className="w-full">{user.info.ladderPoint} LP</div>
      </FlexBox>
    </FlexBox>
  );
}

export default function MatchFoundModal({ info }: { info: GameStart }) {
  return (
    <ModalCard>
      <div className="text-4xl font-bold mb-12 text-center">Match Found</div>
      <FlexBox className="gap-12">
        <UserDisplay user={info.opponent} type="enemy" />
        <div className="text-4xl">vs</div>
        <UserDisplay user={info.me} type="user" />
      </FlexBox>
    </ModalCard>
  );
}
