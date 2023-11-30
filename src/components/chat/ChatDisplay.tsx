import MyChat from "@/components/chat/MyChat";
import OtherChat from "@/components/chat/OtherChat";
import { useAuth } from "@/hooks/data/useAuth";
import useChatInfo from "@/hooks/data/useChatInfo";
import { useMessage } from "@/hooks/data/useMessage";
import { useSocket } from "@/hooks/useSocket";
import FlexBox from "@/layouts/FlexBox";
import ScrollBox from "@/layouts/ScrollBox";
import { CM } from "@/socket/channelMessage";
import { DM, recieveDMList } from "@/socket/directMessage";
import { useEffect, useRef, useState } from "react";

export default function ChatDisplay() {
  const { auth } = useAuth();
  const { DMData, CMData, setDMList } = useMessage();
  const { chatInfo } = useChatInfo();
  const { socket } = useSocket();
  const [chatData, setChatData] = useState<DM[] | CM[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo(0, ref.current.scrollHeight);
  }, [chatData]);

  useEffect(() => {
    if (chatInfo.id !== null) {
      if (chatInfo.type === "DM")
        setChatData(DMData[chatInfo.id]?.message ?? []);
      else setChatData(CMData[chatInfo.id]?.message ?? []);
    }
  }, [chatInfo.id, chatInfo.type, DMData, CMData]);

  useEffect(() => {
    if (chatInfo.id !== null) {
      const setDMListImpl = (data: DM[]) => setDMList(data, chatInfo.id ?? -1);
      if (chatInfo.type === "DM") {
        recieveDMList(socket, chatInfo.id, setDMListImpl);
      }
    }
  }, [chatInfo.id, chatInfo.type, socket]);

  return (
    <ScrollBox ref={ref}>
      <FlexBox direction="col" className="w-full h-full">
        {chatData.map((data, idx) => {
          if (data.sender.id === auth?.id)
            return <MyChat key={idx} content={data.content} />;
          else
            return (
              <OtherChat
                key={idx}
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
