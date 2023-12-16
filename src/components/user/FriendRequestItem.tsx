import { Friend } from "@/api/users/friend";
import FlexBox from "@/layouts/FlexBox";
import Icon from "@/layouts/Icon";

export default function FriendRequestItem({ friend }: { friend: Friend }) {
  return (
    <FlexBox className="w-full justify-between">
      <div>{friend.otherUser.nickname}</div>
      <FlexBox className="gap-4">
        <Icon
          src="/icon/pending.png"
          alt="check"
          className="w-[24px] h-[24px]"
        />
      </FlexBox>
    </FlexBox>
  );
}
