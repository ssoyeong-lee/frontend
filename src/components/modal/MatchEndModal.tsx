import Avatar from "@/components/Avatar";
import ChipButton from "@/components/button/ChipButton";
import { GameResult } from "@/hooks/data/useGame";
import FlexBox from "@/layouts/FlexBox";
import ModalCard from "@/layouts/ModalCard";
import { dateFormatter } from "@/utils/formatter";

interface Props {
  info: GameResult;
  onClick: () => void;
}
export default function MatchEndModal({ info, onClick }: Props) {
  return (
    <ModalCard className="min-w-[600px]">
      <FlexBox className="justify-between gap-8 mb-8">
        <Avatar type={info.user.avatar} />
        <FlexBox className="h-[100px] w-full justify-between">
          <div className="w-2/3">
            <div className="w-full text-2xl mb-4">{info.user.nickname}</div>
            <div className="w-full text-3xl">
              {info.user.ladderPoint +
                (info.result === "win" ? -info.lpChange : info.lpChange)}
              <span
                className={
                  info.result === "win" ? "text-green-cyber" : "text-red-cyber"
                }
              >
                {info.result === "win" ? " + " : " - "}
                {info.lpChange}
              </span>
              {" LP"}
            </div>
          </div>
          <FlexBox className="h-full justify-end w-1/3" direction="col">
            <div className="w-full text-right">
              {dateFormatter(info.playedAt).split(" ")[0]}
            </div>
            <div className="w-full text-right mb-4">
              {dateFormatter(info.playedAt).split(" ")[1]}
            </div>
          </FlexBox>
        </FlexBox>
      </FlexBox>
      <FlexBox className="justify-center mb-8 text-4xl font-bold">
        {info.result === "win" ? (
          <div>You are Win.</div>
        ) : (
          <div>You are Lose.</div>
        )}
      </FlexBox>
      <FlexBox className="justify-center">
        <ChipButton color="green" onClick={onClick}>
          OK
        </ChipButton>
      </FlexBox>
    </ModalCard>
  );
}
