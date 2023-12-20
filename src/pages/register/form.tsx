import { register, uploadAvatar } from "@/api/auth/login";
import Button from "@/layouts/Button";
import FlexBox from "@/layouts/FlexBox";
import SideBox from "@/layouts/SideBox";
import TextBox from "@/layouts/TextBox";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  filename: string;
  selectClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FileInput({ filename, selectClick }: Props) {
  return (
    <FlexBox direction="col" className="w-full h-fit items-start">
      <label htmlFor="file" className="w-full">
        {filename === "" ? (
          <div className="w-full h-fit text-xl font-bold text-black p-2 bg-gray-300 text-center">
            Select Avatar{" "}
            <span className="text-base text-gray-500">(*.png)</span>
          </div>
        ) : (
          <div className="w-full h-fit text-xl font-bold text-black p-2 bg-gray-300 text-center">
            {filename}
          </div>
        )}
      </label>
      <input
        type="file"
        accept=".png"
        className="hidden"
        id="file"
        name="file"
        onChange={selectClick}
      />
    </FlexBox>
  );
}

export default function Register() {
  const router = useRouter();
  const [nickName, setNickName] = useState("");
  const [file, setFile] = useState<File>();
  const selectClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files && setFile(e.target.files[0]);
  };

  const myInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  const onClickBtn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await register(nickName);
      if (res.data?.session !== undefined && res.data?.session !== null) {
        sessionStorage.setItem("session", res.data?.session);
      }
      file && (await uploadAvatar(file));
      router.push("/main");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response?.status === 401) {
        router.push("/login");
        return;
      }
      if (typeof axiosError.response?.data.message === "object")
        toast.error(axiosError.response?.data.message[0]);
      else toast.error(axiosError.response?.data.message);
    }
  };

  return (
    <SideBox>
      <FlexBox direction="col" className="w-fit h-fit items-start gap-8">
        <FlexBox direction="col" className="w-fit h-fit items-start gap-3 ">
          <div className="text-black font-bold text-5xl tracking-wider leading-[3.5rem]">
            Register
          </div>
        </FlexBox>
        <FlexBox direction="col" className="w-fit h-fit items-end gap-1">
          <div className="h-fit w-fit">
            {nickName.length > 10 ? (
              <div className="text-sm tracking-wider text-red-cyber">
                Must be less than 10 characters
              </div>
            ) : (
              ""
            )}
          </div>
          <TextBox
            inputNickname={myInput}
            placeholder="Nickname"
            className="w-[25rem] h-[3rem] font-bold text-2xl tracking-wider bg-gray-100"
          />
        </FlexBox>
        <FileInput filename={file ? file.name : ""} selectClick={selectClick} />
        <Button
          onClickBtn={onClickBtn}
          className="border rounded w-[25rem] h-[3rem] bg-gray-500"
          textClassName="font-bold text-2xl tracking-wider"
        >
          Complete
        </Button>
      </FlexBox>
    </SideBox>
  );
}
