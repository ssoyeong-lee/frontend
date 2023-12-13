import { giveAdmin } from "@/api/channels/admin";
import { banMember, kickMember } from "@/api/channels/operate";
import { inviteGame } from "@/api/games/index";
import useChatInfo from "@/hooks/data/useChatInfo";
import { useUserControl } from "@/hooks/display/useUserControl";
import Divider from "@/layouts/Divider";
import FlexBox from "@/layouts/FlexBox";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface Props {
  id: number;
}

export default function ChatControl({ id }: Props) {
  const router = useRouter();
  const { chatInfo } = useChatInfo();
  const { closeUserControl } = useUserControl();

  const adminClick = async () => {
    console.log("adminClick");
    if (chatInfo.selected !== null) {
      try {
        await giveAdmin(chatInfo.selected.id, id);
      } catch (error) {
        const axiosError = error as AxiosError;
        toast.error(axiosError.response?.status);
      }
    }
    closeUserControl();
  };
  const kickClick = async () => {
    console.log("kickClick");
    if (chatInfo.selected !== null) {
      try {
        await kickMember(chatInfo.selected.id, id);
      } catch (error) {
        const axiosError = error as AxiosError;
        toast.error(axiosError.response?.status);
      }
    }
    closeUserControl();
  };
  const banClick = async () => {
    console.log("banClick");
    if (chatInfo.selected !== null) {
      try {
        await banMember(chatInfo.selected.id, id);
      } catch (error) {
        const axiosError = error as AxiosError;
        toast.error(axiosError.response?.status);
      }
    }
    closeUserControl();
  };
  const muteClick = async () => {
    console.log("muteClick");
    closeUserControl();
  };
  const profileClick = async () => {
    console.log("profileClick");
    closeUserControl();
    router.push(`/main/${id}`);
  };
  const gameClick = async () => {
    try {
      console.log("gameClick");
      await inviteGame(id);
      closeUserControl();
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.status);
    }
  };
  return (
    <FlexBox direction="col" className="w-[200px] gap-2 font-bold">
      {chatInfo.selected?.chatType === "CM" &&
        chatInfo.selected.role === "Owner" && (
          <>
            <div className="userControl-item" onClick={adminClick}>
              make admin
            </div>
            <Divider color="white" />
          </>
        )}
      {chatInfo.selected?.chatType === "CM" &&
        (chatInfo.selected.role === "Owner" ||
          chatInfo.selected.role === "Admin") && (
          <>
            <div className="userControl-item" onClick={kickClick}>
              kick
            </div>
            <div className="userControl-item" onClick={banClick}>
              ban
            </div>
            <div className="userControl-item" onClick={muteClick}>
              mute for 5min
            </div>
            <Divider color="white" />
          </>
        )}
      <div className="userControl-item" onClick={profileClick}>
        view profile
      </div>
      <div className="userControl-item" onClick={gameClick}>
        play game
      </div>
    </FlexBox>
  );
}
