import { createChannel, getChannel, updateChannel } from "@/api/channels";
import SquareButton from "@/components/button/SquareButton";
import DefaultInput from "@/components/control/DefaultInput";
import SelectBox from "@/components/control/SelectBox";
import { chatId, chatList } from "@/hooks/useChannelInfo";
import { useModal } from "@/hooks/useModal";
import FlexBox from "@/layouts/FlexBox";
import ModalCard from "@/layouts/ModalCard";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

interface Props {
  closeModal: () => void;
}

export default function ChatroomSettinngModal({
  closeModal,
}: Props) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");

  const [ selectedId ] = useAtom(chatId);
  const [ , setChannelList ] = useAtom(chatList);

  useEffect(()=> {
    const load = async () => {
      const info = await getChannel(selectedId);
      setTitle(info.data.title);
      setType(info.data.type);
      setPassword("")
      console.log(info.data);
    }
    load();
  },[]);

  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const typeChange = (type: string) => {
    setType(type);
  };
  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onClick = async () => {
    const tmp = await updateChannel(selectedId, {title, type, password});
    setChannelList(tmp.data);
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
              />
            )}
          </FlexBox>
        </div>
        <FlexBox className="w-full justify-end">
          <SquareButton className="w-[150px]" onClick={onClick}>
            Ok
          </SquareButton>
        </FlexBox>
      </FlexBox>
    </ModalCard>
  );
}
