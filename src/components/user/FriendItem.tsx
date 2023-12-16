import { Friend } from "@/api/users/friend";
import FlexBox from "@/layouts/FlexBox";
import Icon from "@/layouts/Icon";

interface Props {
  friend: Friend;
  onClickDelete: (id: number) => void;
}

export default function FriendItem({ friend, onClickDelete }: Props) {
  return (
    <FlexBox className="w-full justify-between">
      <div>{friend.otherUser.nickname}</div>
      <FlexBox className="gap-4">
        <Icon
          src="/icon/delete.png"
          alt="check"
          className="w-[24px] h-[24px] cursor-pointer"
          onClick={() => onClickDelete(friend.otherUser.id)}
        />
      </FlexBox>
    </FlexBox>
  );
}
