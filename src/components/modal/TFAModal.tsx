import { TFASetup } from "@/api/auth/2fa";
import ModalCard from "@/layouts/ModalCard";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function TFAModal() {
  const [qrCode, setQrCode] = useState("");
  useEffect(() => {
    TFASetup()
      .then((res) => {
        setQrCode(res.data.qrimgurl);
      })
      .catch((err) => {
        const axiosError = err as AxiosError;
        toast.error(axiosError.response?.status);
      });
  }, []);

  return (
    <ModalCard className="h-[400px] w-[400px]">
      <div className="h-[228px] w-[228px]">
        <Image src={qrCode} width={228} height={228} alt="QR" />
      </div>
    </ModalCard>
  );
}
