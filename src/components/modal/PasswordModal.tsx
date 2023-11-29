import FlexBox from "@/layouts/FlexBox";
import DefaultInput from "../control/DefaultInput";
import SquareButton from "../button/SquareButton";
import { useState } from "react";
import { joinChannel } from "@/api/channels";
import { useModal } from "@/hooks/display/useModal";
import useChatInfo from "@/hooks/data/useChatInfo";

interface Props {
  id: number;
}

export default function PasswordModal({ id }: Props) {
  const { closeModal } = useModal();
  const { changeId, updateList } = useChatInfo();
  const [password, setPassword] = useState("");
  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const enterClick = async () => {
    console.log(password);
    closeModal();
    updateList("CM");
    const ret = await joinChannel(id, password);
    if (ret.status === 200)
      changeId(id);
    else
      changeId(null);
  };
  return (
    <FlexBox
      direction="col"
      className="w-[400px] h-[250px] gap-6 p-6 bg-gray-600"
    >
      <div className="text-xl tracking-wider font-bold">Enter a Channel</div>
      <DefaultInput
        placeholder="password"
        value={password}
        onChange={passwordChange}
        type="password"
      />
      <SquareButton onClick={enterClick}>Enter</SquareButton>
    </FlexBox>
  );
}
