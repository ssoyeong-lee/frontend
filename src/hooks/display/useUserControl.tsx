import { atom, useAtom } from "jotai";
import React, { useEffect, useState } from "react";

const userControlAtom = atom<JSX.Element>(<></>);
interface UserControlTemplateProps {
  content: JSX.Element;
  x: number;
  y: number;
}

function UserControlTemplate({ content, x, y }: UserControlTemplateProps) {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [yOffset, setYOffset] = useState(0);
  const [show, setShow] = useState(false);
  const { closeUserControl } = useUserControl();

  useEffect(() => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    if (y + rect.height > window.innerHeight) {
      setYOffset(window.innerHeight - rect.height - 10);
    } else setYOffset(y);
    setShow(true);
  }, [y]);

  return (
    <div className="user_control" onClick={closeUserControl}>
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
        {content}
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
  const openUserControl = ({ content, x, y }: UserControlTemplateProps) => {
    setUserControl(<UserControlTemplate content={content} x={x} y={y} />);
  };
  const closeUserControl = () => {
    setUserControl(<></>);
  };
  return { userControl, openUserControl, closeUserControl };
}

export type { UserControlTemplateProps };
export { useUserControl };
