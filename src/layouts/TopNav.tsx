import FlexBox from "@/layouts/FlexBox";
import Icon from "@/layouts/Icon";
import Link from "next/link";
import { useRouter } from "next/router";
import { logout } from "@/api/auth/login";
import { useNoti } from "@/hooks/data/useNoti";
import Alarm from "@/components/alarm/index";
import NotificationDot from "@/components/NotificationDot";
import { useMessage } from "@/hooks/data/useMessage";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useSocket } from "@/hooks/useSocket";
import { Socket } from "socket.io-client";
import ScrollBox from "./ScrollBox";
import { useState } from "react";

interface Props {
  isNoti: boolean;
  setIsNoti: (isNoti: boolean) => void;
}

function NotiCenter({ isNoti, setIsNoti }: Props) {
  const { notiList } = useNoti();

  const onClose = () => {
    setIsNoti(false);
  };
  return (
    <div onClick={onClose} className="fixed z-[101] inset-0">
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed top-28 right-0 bg-gray-500 w-[500px] h-fit max-h-[200px]"
      >
        <ScrollBox className="w-full h-fit max-h-[200px] overflow-auto gap-3 p-3">
          <FlexBox direction="col" className="w-full max-h-[200px] px-2 gap-1">
            {notiList.length === 0 ? (
              <div className="w-full text-cover-white-80">
                새로운 알림이 없습니다
              </div>
            ) : (
              notiList.map((noti, idx) => (
                <Alarm key={idx} noti={noti} idx={idx} />
              ))
            )}
          </FlexBox>
        </ScrollBox>
      </div>
    </div>
  );
}

export default function TopNav() {
  const router = useRouter();
  const { pathname } = router;

  const menuStyle = "text-gray-400 w-[200px] cursor-pointer hover:text-white";
  const activeMenuStyle = "text-white w-[200px] cursor-pointer";


  const { notiList } = useNoti();
  const [isNoti, setIsNoti] = useState(false);
  const { DMData, CMData } = useMessage();
  const { setSocket } = useSocket();


  const onClickLogout = async () => {
    try {
      await logout();
      await router.push("/login");
      router.reload();
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (typeof axiosError.response?.data.message === "object")
        toast.error(axiosError.response?.data.message[0]);
      else toast.error(axiosError.response?.data.message);
    }
  };

  return (
    <>
      <FlexBox className="bg-cover-black-200 justify-between px-6 h-[120px] text-center">
        <Link href="/main" className="text-white text-5xl w-[200px]">
          PONG
        </Link>
        <FlexBox className="gap-6 text-4xl">
          <Link
            href="/play"
            className={pathname === "/play" ? activeMenuStyle : menuStyle}
          >
            Play
          </Link>
          <Link
            href="/user"
            className={pathname === "/user" ? activeMenuStyle : menuStyle}
          >
            User
          </Link>
          <Link
            href="/chat"
            className={pathname === "/chat" ? activeMenuStyle : menuStyle}
          >
            <div className="relative w-fit mx-auto">
              Chat
              {Object.values(DMData).reduce((acc, cur) => {
                return acc + cur.unreadCount ?? 0;
              }, 0) +
                Object.values(CMData).reduce((acc, cur) => {
                  return acc + cur.unreadCount ?? 0;
                }, 0) >
                0 && (
                <NotificationDot
                  amount={-1}
                  className="absolute right-[-4px] bottom-[-4px]"
                />
              )}
            </div>
          </Link>
          <FlexBox className="gap-6">
            <div className="relative min-w-[48px]">
              <Icon
                onClick={()=>setIsNoti(true)}
                src="/icon/alarm.svg"
                alt="alarm"
                className="cursor-pointer"
              />
              {notiList.length > 0 && (
                <NotificationDot
                  amount={-1}
                  className="absolute right-[-4px] bottom-[-4px]"
                />
              )}
            </div>
            <Icon
              onClick={onClickLogout}
              src="/icon/logout.svg"
              alt="logout"
              className="cursor-pointer"
            />
          </FlexBox>
        </FlexBox>
      </FlexBox>
      {isNoti === true && <NotiCenter isNoti={isNoti} setIsNoti={setIsNoti} />}
    </>
  );
}
