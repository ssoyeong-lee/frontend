//import FlexBox from "@/layouts/FlexBox";
//import DefaultInput from "../control/DefaultInput";
//import SquareButton from "../button/SquareButton";
//import { useState } from "react";

//export default function ChatroomSettinngModal() {
//  const [pw, setPw] = useState<string>();
//  const [again, setAgain] = useState<string>();

//  const pwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//    setPw(e.target.value);
//  };
//  const againChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//    setAgain(e.target.value);
//  };

//  return (
//    <FlexBox
//      direction="col"
//      className="w-[300px] h-[324px] gap-6 p-6 text-base tracking-wider bg-gray-600"
//    >
//      <div className="font-bold">Change Password</div>
//      <FlexBox direction="col" className="w-full h-full gap-3">
//        <DefaultInput
//          placeholder="new"
//          value={pw}
//          onChange={pwChange}
//          className="bg-gray-700"
//          type="password"
//        />
//        <DefaultInput
//          placeholder="again"
//          value={again}
//          onChange={againChange}
//          className="bg-gray-700"
//          type="password"
//        />
//        <div className="h-6 w-full">
//          {again && pw !== again ? (
//            <div className="text-red-cyber text-right">wrong password</div>
//          ) : (
//            <></>
//          )}
//        </div>
//      </FlexBox>
//      <FlexBox className="w-full justify-end">
//        <SquareButton className="w-[150px]">Ok</SquareButton>
//      </FlexBox>
//    </FlexBox>
//  );
//}

import { createChannel, getChannel, updateChannel } from "@/api/channels";
import SquareButton from "@/components/button/SquareButton";
import DefaultInput from "@/components/control/DefaultInput";
import SelectBox from "@/components/control/SelectBox";
import useChatInfo from "@/hooks/data/useChatInfo";
import { useModal } from "@/hooks/display/useModal";
import FlexBox from "@/layouts/FlexBox";
import ModalCard from "@/layouts/ModalCard";
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
	const {chatInfo} = useChatInfo();
  useEffect(() => {
    const load = async () => {
      if (chatInfo.id === null)
        return ;
      const info = await getChannel(chatInfo.id);
      setTitle(info.data.title);
      setType(info.data.type);
      setPassword("");
      console.log(info.data);
    };
    load();
  }, []);

  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const typeChange = (type: string) => {
    setType(type);
  };
  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onClick = () => {
    if (chatInfo.id === null)
      return ;
    updateChannel(chatInfo.id, { title, type, password });
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
