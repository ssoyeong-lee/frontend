import MyChat from "@/components/chat/MyChat";
import OtherChat from "@/components/chat/OtherChat";
import { useAuth } from "@/hooks/data/useAuth";
import useChatInfo from "@/hooks/data/useChatInfo";
import { useMessage } from "@/hooks/data/useMessage";
import FlexBox from "@/layouts/FlexBox";
import ScrollBox from "@/layouts/ScrollBox";
import { CM } from "@/socket/channelMessage";
import { DM } from "@/socket/directMessage";
import { useEffect, useState } from "react";

export default function ChatDisplay() {
  const { auth } = useAuth();
  const { DMData, CMData } = useMessage();
  const { chatInfo } = useChatInfo();
  const [chatData, setChatData] = useState<DM[] | CM[]>([]);
  useEffect(() => {
    if (chatInfo.id != null) {
      // if (chatInfo.type === "DM") setChatData(DMData[chatInfo.id]);
      // else setChatData(CMData[chatInfo.id]);
      chatInfo.type === "CM" && setChatData(CMData[chatInfo.id]);
			console.log(chatInfo.id);
    }
  }, [chatInfo]);

  return (
    <ScrollBox>
      <FlexBox direction="col" className="w-full h-full">
        {chatData.map((data) => {
          if (data.sender.id === auth?.id)
            return <MyChat content={data.content} />;
          else
            return (
              <OtherChat
                id={data.sender.id}
                nickname={data.sender.nickname}
                content={data.content}
              />
            );
        })}
      </FlexBox>
    </ScrollBox>
  );
}
