import FlexBox from "@/layouts/FlexBox";
import Icon from "@/layouts/Icon";
import Link from "next/link";
import { useRouter } from "next/router";
import { useNotification } from "@/hooks/display/useNotification";
import { logout } from "@/api/auth/login";
import { useNoti } from "@/hooks/data/useNoti";
import Alarm from "@/components/alarm/index";
import NotificationDot from "@/components/NotificationDot";
import { useMessage } from "@/hooks/data/useMessage";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function TopNav() {
  const router = useRouter();
  const { pathname } = router;

  const menuStyle = "text-gray-400 w-[200px] cursor-pointer hover:text-white";
  const activeMenuStyle = "text-white w-[200px] cursor-pointer";

  const { openNotification } = useNotification();
  const { notiList } = useNoti();
  const { DMData, CMData } = useMessage();
  const onClickNotification = () => {
    openNotification(
      <FlexBox direction="col" className="w-full max-h-[200px] px-2 gap-1">
        {notiList.length === 0 ? (
          <div className="w-full text-cover-white-80">새로운 알림이 없습니다</div>
        ) : (
          notiList.map((noti, idx) => <Alarm key={idx} noti={noti} idx={idx} />)
        )}
      </FlexBox>
    );
  };

  const onClickLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.status);
    }
  };

  return (
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
              onClick={onClickNotification}
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
  );
}
