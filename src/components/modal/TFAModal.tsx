import { TFASetup } from "@/api/auth/2fa";
import ModalCard from "@/layouts/ModalCard";
import { AxiosError } from "axios";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

export default function TFAModal() {
  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const res = await TFASetup();
        console.log(res.data.otpauthurl);
      } catch (error) {
        const axiosError = error as AxiosError;
        toast.error(axiosError.response?.status);
      }
    };
    asyncFunc();
  }, []);
  return <ModalCard>hell</ModalCard>;
}
