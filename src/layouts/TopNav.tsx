import FlexBox from "@/layouts/FlexBox";
import Icon from "@/layouts/Icon";
import Link from "next/link";
import { useRouter } from "next/router";
import { useNotification } from "@/hooks/display/useNotification";
import { logout } from "@/api/auth/login";
import { useNoti } from "@/hooks/data/useNoti";
import Alarm from "@/components/alarm/index";

export default function TopNav() {
  const router = useRouter();
  const { pathname } = router;

  const menuStyle = "text-gray-400 w-[200px] cursor-pointer hover:text-white";
  const activeMenuStyle = "text-white w-[200px] cursor-pointer";

  const { openNotification } = useNotification();
  const { notiList } = useNoti();
  const onClickNotification = () => {
    openNotification(
      <div className="w-full max-h-[200px] px-2">
        {notiList.map((noti, idx) => (
          <Alarm key={idx} noti={noti} />
        ))}
      </div>
    );
  };

  const onClickLogout = async () => {
    await logout();
    router.push("/login");
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
          Chat
        </Link>
        <FlexBox className="gap-6">
          <Icon
            onClick={onClickNotification}
            src="/icon/alarm.svg"
            alt="alarm"
            className="cursor-pointer"
          />
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
