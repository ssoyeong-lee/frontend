import { acceptGame, rejectGame } from "@/api/games/index";
import ChipButton from "@/components/button/ChipButton";
import { useNotification } from "@/hooks/display/useNotification";
import FlexBox from "@/layouts/FlexBox";
import { NotiGameInvite } from "@/socket/notification";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface GameInviteAlarmProps {
  noti: NotiGameInvite;
  idx: number;
}

export default function GameInviteAlarm({ noti, idx }: GameInviteAlarmProps) {
  const { closeNotification } = useNotification();
  const acceptClick = async () => {
    try {
      await acceptGame(noti.invitingUser.id);
      closeNotification();
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.status);
    }
  };
  const rejectClick = async () => {
    try {
      await rejectGame(noti.invitingUser.id);
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.status);
    }
  };
  return (
    <FlexBox className="w-full justify-between">
      <div>
        <span>{noti.invitingUser.nickname}</span>
        <span>님이 게임에 초대했습니다.</span>
      </div>
      <FlexBox className="w-fit h-fit gap-3">
        <ChipButton color="green" className="text-xs" onClick={acceptClick}>
          수락
        </ChipButton>
        <ChipButton color="red" className="text-xs" onClick={rejectClick}>
          거절
        </ChipButton>
      </FlexBox>
    </FlexBox>
  );
}
