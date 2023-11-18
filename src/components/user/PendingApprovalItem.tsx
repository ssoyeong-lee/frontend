import { Friend } from "@/api/users/friend";
import FlexBox from "@/layouts/FlexBox";
import Icon from "@/layouts/Icon";
import { on } from "events";

interface Props {
  friend: Friend;
  onClickApprove: (id: number) => void;
  onClickDeny: (id: number) => void;
}

export default function PendingApprovalItem({
  friend,
  onClickApprove,
  onClickDeny,
}: Props) {
  return (
    <FlexBox className="w-full justify-between">
      <div>{friend.nickname}</div>
      <FlexBox className="gap-4">
        <Icon
          src="/icon/approve.png"
          alt="ap"
          className="w-[24px] h-[24px] cursor-pointer"
          onClick={() => onClickApprove(friend.otherUserId)}
        />
        <Icon
          src="/icon/deny.png"
          alt="deny"
          className="w-[24px] h-[24px] cursor-pointer"
          onClick={() => onClickDeny(friend.otherUserId)}
        />
      </FlexBox>
    </FlexBox>
  );
}
