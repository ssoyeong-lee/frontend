import { getChannel, updateChannel } from "@/api/channels";
import SquareButton from "@/components/button/SquareButton";
import DefaultInput from "@/components/control/DefaultInput";
import SelectBox from "@/components/control/SelectBox";
import useChatInfo from "@/hooks/data/useChatInfo";
import { useModal } from "@/hooks/display/useModal";
import FlexBox from "@/layouts/FlexBox";
import ModalCard from "@/layouts/ModalCard";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ChatroomSettinngModal() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");

  const { chatInfo, updateInfo } = useChatInfo();
  const { closeModal } = useModal();

  useEffect(() => {
    const load = async () => {
      if (chatInfo.selected === null) return;
      try {
        const info = await getChannel(chatInfo.selected.id);
        setTitle(info.data.title);
        setType(info.data.type);
        setPassword("");
        console.log(info.data);
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
    load();
  }, []);

  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const titleCheck = (value: string): string => {
    if (value.length > 10) return "too long";
    return "";
  };
  const typeChange = (type: string) => {
    setType(type);
  };
  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const pwCheck = (value: string): string => {
    if (value.length < 4) return "too short";
    else if (value.length > 10) return "too long";
    return "";
  };

  const okClick = () => {
    if (chatInfo.selected === null) return;
    updateChannel(chatInfo.selected.id, { title, type, password });
    updateInfo(chatInfo.selected.id, "CM");
    closeModal();
  };

  return (
    <ModalCard className="w-[500px] h-[450px]">
      <FlexBox className="w-full h-full justify-between" direction="col">
        <div className="w-full">
          <div className="w-full text-xl font-bold mb-8 text-center">
            Change Channel Setting
          </div>
          <FlexBox className="w-full gap-3" direction="col">
            <DefaultInput
              value={title}
              onChange={titleChange}
              placeholder="title"
              checkValid={titleCheck}
            />
            <SelectBox
              list={["private", "protected", "public"]}
              value={type}
              onChange={typeChange}
            />
            {type === "protected" && (
              <DefaultInput
                placeholder="password"
                value={password}
                onChange={passwordChange}
                type="password"
                checkValid={pwCheck}
              />
            )}
          </FlexBox>
        </div>
        <FlexBox className="w-full justify-end">
          <SquareButton className="w-[150px]" onClick={okClick}>
            Ok
          </SquareButton>
        </FlexBox>
      </FlexBox>
    </ModalCard>
  );
}
