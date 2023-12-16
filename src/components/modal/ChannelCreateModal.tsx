import { createChannel } from "@/api/channels";
import SquareButton from "@/components/button/SquareButton";
import DefaultInput from "@/components/control/DefaultInput";
import SelectBox from "@/components/control/SelectBox";
import useChatInfo from "@/hooks/data/useChatInfo";
import { useModal } from "@/hooks/display/useModal";
import FlexBox from "@/layouts/FlexBox";
import ModalCard from "@/layouts/ModalCard";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ChannelCreateModal() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<string>("private");
  const [password, setPassword] = useState("");
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

  const { closeModal } = useModal();
  const { chatInfo, updateInfo } = useChatInfo();
  const okClick = async () => {
    try {
      await createChannel({ title, type, password });
      closeModal();
      chatInfo.selected && updateInfo(chatInfo.selected.id, "CM");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (typeof axiosError.response?.data.message === "object")
        toast.error(axiosError.response?.data.message[0]);
      else toast.error(axiosError.response?.data.message);
    }
  };

  return (
    <ModalCard className="w-[500px] h-[450px]">
      <FlexBox className="w-full h-full justify-between" direction="col">
        <div className="w-full">
          <div className="w-full text-xl font-bold mb-8 text-center">
            Create a new Channel
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
