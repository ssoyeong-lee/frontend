import { TFASetup } from "@/api/auth/2fa";
import ModalCard from "@/layouts/ModalCard";
import React, { useEffect } from "react";

export default function TFAModal() {
  useEffect(() => {
    const asyncFunc = async () => {
      const res = await TFASetup();
      console.log(res.data.otpauthurl);
    };
    asyncFunc();
  }, []);
  return <ModalCard>hell</ModalCard>;
}
