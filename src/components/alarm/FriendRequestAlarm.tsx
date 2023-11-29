import ChipButton from "@/components/button/ChipButton";
import { useNoti } from "@/hooks/data/useNoti";
import FlexBox from "@/layouts/FlexBox";
import Icon from "@/layouts/Icon";
import { NotiFriendRequest } from "@/socket/notification";

interface FriendRequestAlarmProps {
  noti: NotiFriendRequest;
  idx: number;
}

export default function FriendRequestAlarm({
  noti,
  idx,
}: FriendRequestAlarmProps) {
  const { removeNoti } = useNoti();
  const onClickDelete = () => {
    removeNoti(idx);
  };
  return (
    <FlexBox className="justify-between">
      <div>
        <span>{noti.requestingUser.nickname}</span>
        <span>님이 친구 초대를 보냈습니다.</span>
      </div>
      <ChipButton color="green">수락</ChipButton>
      <Icon
        src="/icon/read-receipt.png"
        alt=""
        className="w-[24px] cursor-pointer"
        onClick={onClickDelete}
      />
    </FlexBox>
  );
}
