import { TFAOn, TFASetup } from "@/api/auth/2fa";
import FlexBox from "@/layouts/FlexBox";
import ModalCard from "@/layouts/ModalCard";
import { AxiosError } from "axios";
import Image from "next/image";
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
};

export default function TFAModal() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [qrCode, setQrCode] = useState("");
  useEffect(() => {
    TFASetup()
      .then((res) => {
        setQrCode(res.data.qrimgurl);
      })
      .catch((error) => {
        const axiosError = error as AxiosError<{ message: string }>;
        if (axiosError.response?.status === 401) {
          router.push("/login");
          return;
        }
        if (typeof axiosError.response?.data.message === "object")
          toast.error(axiosError.response?.data.message[0]);
        else toast.error(axiosError.response?.data.message);
      });
  }, []);

  const onChangeCode = (value: string) => {
    setCode(value);
  };

  useEffect(() => {
    if (code.length === 6)
      TFAOn(code)
        .then((res) => {
          if (res.data.success === false)
            toast.error("유효하지 않은 Token 입니다.");
          else router.reload();
        })
        .catch((error) => {
          const axiosError = error as AxiosError<{ message: string }>;
          if (axiosError.response?.status === 401) {
            router.push("/login");
            return;
          }
          if (typeof axiosError.response?.data.message === "object")
            toast.error(axiosError.response?.data.message[0]);
          else toast.error(axiosError.response?.data.message);
        });
  }, [code]);

  return (
    <ModalCard className="h-[550px] w-[450px]">
      <FlexBox direction="col" className="gap-8 h-full justify-between">
        <div className="text-2xl font-bold text-center">2FA SETUP</div>
        <div className="h-[250px] w-[250px] mx-auto">
          {qrCode !== "" && (
            <Image src={qrCode} width={400} height={400} alt="QR" />
          )}
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
    </ModalCard>
  );
}
