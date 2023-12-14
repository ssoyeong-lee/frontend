import { TFALogin } from "@/api/auth/2fa";
import FlexBox from "@/layouts/FlexBox";
import SideBox from "@/layouts/SideBox";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactCodeInput from "react-code-input";
import { toast } from "react-toastify";

const inputStyle: React.CSSProperties = {
  margin: "7px",
  width: "50px",
  fontSize: "36px",
  height: "60px",
  textAlign: "center",
  backgroundColor: "white",
  color: "black",
  border: "black 1.5px solid",
};
export default function Register() {
  const router = useRouter();
  const [code, setCode] = useState("");

  const onChangeCode = (value: string) => {
    setCode(value);
  };

  useEffect(() => {
    if (code.length === 6)
      TFALogin(code)
        .then((res) => {
          if (res.data?.session !== undefined && res.data?.session !== null) {
            sessionStorage.setItem("session", res.data?.session);
          }
          if (res.data.success === false)
            toast.error("유효하지 않은 Token 입니다.");
          else router.push("/main");
        })
        .catch((err) => {
          const axiosError = err as AxiosError;
          if (typeof axiosError.response?.data.message === "object")
            toast.error(axiosError.response?.data.message[0]);
          else toast.error(axiosError.response?.data.message);
        });
  }, [code]);

  return (
    <SideBox>
      <FlexBox direction="col" className="items-start box-border gap-9">
        <FlexBox direction="col" className="items-start gap-8 w-[25rem]">
          <div className="text-black font-bold text-5xl tracking-wider leading-[3.5rem]">
            2FA
          </div>
          <ReactCodeInput
            fields={6}
            value={code}
            name="code"
            type="tel"
            inputMode="numeric"
            inputStyle={inputStyle}
            onChange={onChangeCode}
          />
        </FlexBox>
      </FlexBox>
    </SideBox>
  );
}
