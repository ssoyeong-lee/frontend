import { UserDetail } from "@/api/users/index";
import Card from "@/layouts/Card";
import Divider from "@/layouts/Divider";
import FlexBox from "@/layouts/FlexBox";
import ScrollBox from "@/layouts/ScrollBox";
import { dateFormatter } from "@/utils/formatter";

export default function HistoryCard({ user }: { user: UserDetail | null }) {
  return (
    <Card>
      <FlexBox className="w-full max-h-full text-center gap-4" direction="col">
        <FlexBox className="w-full justify-between">
          <div className="w-2/12 text-start">Date</div>
          <div className="w-1/12">Score</div>
          <div className="w-1/12">Outcome</div>
          <div className="w-1/12">Ladder</div>
        </FlexBox>
        <Divider color="white" />
        <ScrollBox className="flex-1">
          {user?.matchHistorys
            ?.sort((a, b) => {
              return (
                new Date(b.playedAt).getTime() - new Date(a.playedAt).getTime()
              );
            })
            ?.map((history, idx) => (
              <FlexBox className="w-full justify-between" key={idx}>
                <div className="w-2/12 text-start">
                  {dateFormatter(history.playedAt)}
                </div>
                <div className="w-1/12">
                  {history.userScore + " : " + history.opponentScore}
                </div>
                <div
                  className={`w-1/12 ${
                    history.result === "win"
                      ? "text-green-cyber"
                      : "text-red-cyber"
                  }`}
                >
                  {history.result}
                </div>
                <div
                  className={`w-1/12 ${
                    history.result === "win"
                      ? "text-green-cyber"
                      : "text-red-cyber"
                  }`}
                >
                  {history.result === "win" && "+"}
                  {history.lpChange}
                </div>
              </FlexBox>
            ))}
        </ScrollBox>
      </FlexBox>
    </Card>
  );
}
