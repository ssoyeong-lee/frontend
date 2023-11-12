import { Friend } from "@/api/users/friend";
import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";
import Icon from "@/layouts/Icon";

interface Props {
  friendList: Friend[];
}

export default function FriendCard({ friendList }: Props) {
  return (
    <Card>
      <FlexBox className="h-full gap-8 text-xl" direction="col">
        <div>Friends</div>
        {friendList.map((friend, idx) => {
          return (
            <FlexBox className="w-full justify-between" key={idx}>
              <div>{friend.nickname}</div>
              <FlexBox className="gap-4">
                <Icon
                  src="/icon/check.png"
                  alt="check"
                  className="w-[24px] h-[24px]"
                />
                <Icon
                  src="/icon/delete.png"
                  alt="delete"
                  className="w-[24px] h-[24px]"
                />
              </FlexBox>
            </FlexBox>
          );
        })}
      </FlexBox>
    </Card>
  );
}
