import {
  useUserControl,
  UserControlTemplateProps,
} from "@/hooks/display/useUserControl";
import FlexBox from "@/layouts/FlexBox";
import ChatControl from "../userControl/ChatControl";
interface Props {
  id: number;
  nickname: string;
  content: string;
}

function OtherChat({ id, nickname, content }: Props) {
  const { openUserControl } = useUserControl();
  return (
    <FlexBox className="w-full gap-6 py-2">
      <div
        className="w-[100px] font-bold cursor-pointer hover:text-lightblue-cyber"
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          console.log(target.getBoundingClientRect());
          const arg: UserControlTemplateProps = {
            content: <ChatControl id={id} />,
            x: target.getBoundingClientRect().x,
            y:
              target.getBoundingClientRect().y +
              target.getBoundingClientRect().height +
              5,
          };
          openUserControl(arg);
        }}
      >
        {nickname}
      </div>
      <div className="text-white">{content}</div>
    </FlexBox>
  );
}

export default OtherChat;
