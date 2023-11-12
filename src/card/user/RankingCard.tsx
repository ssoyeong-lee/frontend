import { UserAbstract } from "@/api/users/index";
import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";

interface Props {
  userList: UserAbstract[];
}

export default function RankingCard({ userList }: Props) {
  const sortedUserList = userList.sort((a, b) => b.ladderPoint - a.ladderPoint);
  return (
    <Card>
      <FlexBox className="h-full gap-8 text-xl" direction="col">
        <div className="font-bold">Ranking</div>
        {sortedUserList.slice(0, 5).map((user, idx) => {
          return (
            <FlexBox className="w-full gap-6" key={idx}>
              <div className={`${idx === 0 && "text-3xl font-bold"} w-[60px]`}>
                #{idx + 1}
              </div>
              <div>{user.nickname}</div>
            </FlexBox>
          );
        })}
      </FlexBox>
    </Card>
  );
}
