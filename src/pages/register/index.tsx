import { userRedirect } from "@/api/auth/login";
import Button from "@/layouts/Button";
import FlexBox from "@/layouts/FlexBox";
import SideBox from "@/layouts/SideBox";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Register() {
  const router = useRouter();

  useEffect(() => {
    const asyncFunc = async () => {
      if (!router.isReady) return;
      const { code, state } = router.query;
      if (code && state) {
        try {
          const res = await userRedirect(
            code as string,
            state as string,
            window.location.protocol + "//" + window.location.host + "/register"
          );
          if (res.data?.session !== undefined && res.data?.session !== null) {
            sessionStorage.setItem("session", res.data?.session);
          }
          if (res.data?.redirect === "home") {
            router.push("/main");
          } else if (res.data?.redirect === "register") {
            router.push("/register/form");
          } else if (res.data?.redirect === "2FA") {
            router.push("/register/2fa");
          }
        } catch (error) {
          console.log(error);
          const axiosError = error as AxiosError<{ message: string }>;
          if (typeof axiosError.response?.data.message === "object")
            toast.error(axiosError.response?.data.message[0]);
          else toast.error(axiosError.response?.data.message);
        }
      } else {
        router.push("/login");
      }
    };
    asyncFunc();
  }, [router.isReady]);

  return (
    <SideBox>
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
          onClickBtn={() => {}}
          className="border rounded w-[25rem] h-[3rem]"
          textClassName="font-bold text-2xl tracking-wider"
        >
          로그인 중 입니다...
        </Button>
      </FlexBox>
    </SideBox>
  );
}
