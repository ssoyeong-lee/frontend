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
  const { DMData, CMData, setDMList, setCMUnreadCount, setDMUnreadCount } =
    useMessage();
  const { chatInfo } = useChatInfo();
  const { socket } = useSocket();
  const [chatData, setChatData] = useState<DM[] | CM[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo(0, ref.current.scrollHeight);
  }, [chatData]);

  useEffect(()=>{
    if (chatInfo.selected === null) {
        setChatData([]);
    }
  }, [chatInfo.selected])
  
  useEffect(() => {
    if (chatInfo.selected !== null) {
      if (chatInfo.selected.chatType === "DM") {
        setChatData(DMData[chatInfo.selected.id]?.message ?? []);
        if (DMData[chatInfo.selected.id]?.unreadCount !== 0)
          setDMUnreadCount(chatInfo.selected.id, 0);
      } else {
        setChatData(CMData[chatInfo.selected.id]?.message ?? []);
        if (CMData[chatInfo.selected.id]?.unreadCount !== 0)
          setCMUnreadCount(chatInfo.selected.id, 0);
      }
    }
  }, [chatInfo.selected, chatInfo.type, DMData, CMData]);

  useEffect(() => {
    if (chatInfo.selected !== null) {
      const setDMListImpl = (data: DM[]) => {
        chatInfo?.selected && setDMList(data, chatInfo.selected.id ?? -1)
      };
      if (chatInfo.type === "DM") {
        chatInfo?.selected && recieveDMList(socket, chatInfo.selected.id, setDMListImpl);
      }
    }
  }, [chatInfo.selected, chatInfo.type, socket]);

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
