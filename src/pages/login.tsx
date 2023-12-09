import { login } from "@/api/auth/login";
import { testLogin } from "@/api/testLogin";
import SpinningLoad from "@/components/SpinningLoad";
import { useSocket } from "@/hooks/useSocket";
import Button from "@/layouts/Button";
import FlexBox from "@/layouts/FlexBox";
import SideBox from "@/layouts/SideBox";
import connectSocket from "@/socket/connectSocket";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const { setSocket } = useSocket();
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  const onClickBtn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsClicked(true);
    try {
      const res = await login(
        window.location.protocol + "//" + window.location.host + "/register"
      );
      router.push(res.data?.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.status);
    }
  };

  const onClickTest = async (num: number) => {
    try {
      const res = await testLogin(num);
      if (res.data?.session !== undefined && res.data?.session !== null) {
        sessionStorage.setItem("session", res.data?.session);
      }
      router.push("/main");
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.status);
    }
  };

  return (
    <SideBox animate>
      <FlexBox direction="col" className="items-start box-border gap-9">
        <FlexBox direction="col" className="items-start gap-3 ">
          <div className="text-black font-bold text-5xl tracking-wider leading-[3.5rem]">
            Login
          </div>
          <div className="text-black font-bold text-xl tracking-wider">
            Use 42 Account
          </div>
        </FlexBox>
        <Button
          onClickBtn={onClickBtn}
          className="border rounded w-[25rem] h-[3rem]"
          textClassName="font-bold text-2xl tracking-wider"
        >
          {isClicked ? <SpinningLoad /> : "42 Intra로 로그인"}
        </Button>

        <Button
          onClickBtn={() => onClickTest(1)}
          className="border rounded w-[25rem] h-[3rem]"
          textClassName="font-bold text-2xl tracking-wider"
        >
          {isClicked ? <SpinningLoad /> : "test1 로그인"}
        </Button>
        <Button
          onClickBtn={() => onClickTest(2)}
          className="border rounded w-[25rem] h-[3rem]"
          textClassName="font-bold text-2xl tracking-wider"
        >
          {isClicked ? <SpinningLoad /> : "test2 로그인"}
        </Button>
      </FlexBox>
    </SideBox>
  );
}
