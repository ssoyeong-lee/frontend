import Divider from "@/layouts/Divider";
import FlexBox from "@/layouts/FlexBox";
import { atom, useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import useChatInfo from "../data/useChatInfo";
import { banMember, kickMember } from "@/api/channels/operate";
import { giveAdmin } from "@/api/channels/admin";

const userControlAtom = atom<JSX.Element>(<></>);
interface UserControlTemplateProps {
  id: number;
  x: number;
  y: number;
  onClose?: () => void;
}

function UserControlTemplate({ id, x, y, onClose }: UserControlTemplateProps) {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [yOffset, setYOffset] = useState(0);
  const [show, setShow] = useState(false);
  const className = "w-full p-2 cursor-pointer hover:bg-gray-700";
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
  };
  const gameClick = async () => {
    console.log("gameClick");
    closeUserControl();
  };

  useEffect(() => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    if (y + rect.height > window.innerHeight) {
      setYOffset(window.innerHeight - rect.height - 10);
    } else setYOffset(y);
    setShow(true);
  }, [y]);

  return (
    <div className="user_control" onClick={onClose}>
      <div
        className="user_control-container"
        style={{
          top: yOffset,
          left: x,
          visibility: show ? "visible" : "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
        ref={divRef}
      >
        <FlexBox direction="col" className="w-[200px] gap-2 font-bold">
          {chatInfo.role === "Owner" && (
            <>
              <div className={className} onClick={adminClick}>make admin</div>
              <Divider color="white" />
            </>
          )}
          {(chatInfo.role === "Owner" || chatInfo.role === "Admin") && (
            <>
              <div className={className} onClick={kickClick}>
                kick
              </div>
              <div className={className} onClick={banClick}>
                ban
              </div>
              <div className={className} onClick={muteClick}>mute for 5min</div>
              <Divider color="white" />
            </>
          )}
          <div className={className} onClick={profileClick}>view profile</div>
          <div className={className} onClick={gameClick}>play game</div>
        </FlexBox>
      </div>
    </div>
  );
}

interface UseUserControlType {
  userControl: JSX.Element | null;
  openUserControl: (props: UserControlTemplateProps) => void;
  closeUserControl: () => void;
}

function useUserControl(): UseUserControlType {
  const [userControl, setUserControl] = useAtom(userControlAtom);
  const openUserControl = ({ id, x, y }: UserControlTemplateProps) => {
    setUserControl(
      <UserControlTemplate id={id} x={x} y={y} onClose={closeUserControl} />
    );
  };
  const closeUserControl = () => {
    setUserControl(<></>);
  };
  return { userControl, openUserControl, closeUserControl };
}

export { useUserControl };
