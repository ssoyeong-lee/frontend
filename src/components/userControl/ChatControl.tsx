import { giveAdmin } from "@/api/channels/admin";
import { banMember, kickMember } from "@/api/channels/operate";
import useChatInfo from "@/hooks/data/useChatInfo";
import { useUserControl } from "@/hooks/display/useUserControl";
import Divider from "@/layouts/Divider";
import FlexBox from "@/layouts/FlexBox";
import { useRouter } from "next/router";

interface Props {
  id: number;
}

export default function ChatControl({ id }: Props) {
  const router = useRouter();
  const { chatInfo } = useChatInfo();
  const { closeUserControl } = useUserControl();

  const adminClick = async () => {
    console.log("adminClick");
    if (chatInfo.id !== null) await giveAdmin(chatInfo.id, id);
    closeUserControl();
  };
  const kickClick = async () => {
    console.log("kickClick");
    if (chatInfo.id !== null) await kickMember(chatInfo.id, id);
    closeUserControl();
  };
  const banClick = async () => {
    console.log("banClick");
    if (chatInfo.id !== null) await banMember(chatInfo.id, id);
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
    console.log("gameClick");
    closeUserControl();
  };
  return (
    <FlexBox direction="col" className="w-[200px] gap-2 font-bold">
      {chatInfo.role === "Owner" && (
        <>
          <div className="userControl-item" onClick={adminClick}>
            make admin
          </div>
          <Divider color="white" />
        </>
      )}
      {(chatInfo.role === "Owner" || chatInfo.role === "Admin") && (
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
