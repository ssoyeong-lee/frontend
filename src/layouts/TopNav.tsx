import FlexBox from "@/layouts/FlexBox";
import Icon from "@/layouts/Icon";
import Link from "next/link";
import { useRouter } from "next/router";
import { useNotification } from "@/hooks/useNotification";

export default function TopNav() {
  const router = useRouter();
  const { pathname } = router;

  const menuStyle = "text-gray-400 w-[200px] cursor-pointer hover:text-white";
  const activeMenuStyle = "text-white w-[200px] cursor-pointer";

  const { openNotification } = useNotification();
  const onClick = () => {
    openNotification(
      <div className="w-full h-fit">
        <FlexBox direction="row" className="w-full h-fit justify-between p-[8px]">
          <div >user1님이 게임에 초대하였습니다.</div>
          <div className="px-[8px] py-[4px] border-solid border border-green-cyber">수락</div>
        </FlexBox>
        <div className="p-[8px]">user2님이 게임에 초대하였습니다.</div>
      </div>
    );
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
            onClick={onClick}
            src="/icon/alarm.svg"
            alt="alarm"
            className="cursor-pointer"
          />
          <Icon
            src="/icon/logout.svg"
            alt="logout"
            className="cursor-pointer"
          />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
