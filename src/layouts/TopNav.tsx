import FlexBox from "@/layouts/FlexBox";
import Icon from "@/layouts/Icon";
import Link from "next/link";
import { useRouter } from "next/router";

export default function TopNav() {
  const router = useRouter();
  const { pathname } = router;

  const menuStyle = "text-gray-400 w-[200px] cursor-pointer hover:text-white";
  const activeMenuStyle = "text-white w-[200px] cursor-pointer";

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
          <Icon src="/icon/alarm.svg" alt="alarm" className="cursor-pointer" />
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
