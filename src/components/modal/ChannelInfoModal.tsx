import { ChannelRelation, SpecificChannel, getChannel } from "@/api/channels";
import { getBanMemberList, removeBanMember } from "@/api/channels/operate";
import { UserDetail } from "@/api/users";
import useChatInfo from "@/hooks/data/useChatInfo";
import FlexBox from "@/layouts/FlexBox";
import ScrollBox from "@/layouts/ScrollBox";
import { useEffect, useState } from "react";

// interface Props {
//   channel_id: number;
//   user_id: number;
// }

// function CancelButton({channel_id, user_id}: Props) {
//   const buttonClick = async () => {
//     await removeBanMember(channel_id, user_id);
//   }
//   return (
//     <button onClick={buttonClick} className="text-xs font-bold px-2 py-1 border-[1.5px] border-deepred-cyber hover:bg-deepred-cyber hover:text-black">
//       X
//     </button>
//   );
// }

export default function ChannelInfoModal() {
  const { chatInfo } = useChatInfo();

  if (chatInfo.index === null) {
    console.log("ChannelInfoModal(): chatInfo.index ===null");
    return <></>;
  }
  const channel = chatInfo.channelList[chatInfo.index];

  const [memberList, setMemberList] = useState<ChannelRelation[]>([]);
  const [bannedList, setBannedList] = useState<UserDetail[]>([]);

  const getData = async () => {
    const memberData = (await getChannel(channel.id)).data.channelRelations;
    const bannedData = (await getBanMemberList(channel.id)).data;

    console.log("MemberList: ", memberData);
    
    setBannedList(bannedData);
  };
  useEffect(() => {
    getData();
  }, []);

  console.log(chatInfo);
  return (
    <FlexBox
      direction="col"
      className="w-[600px] h-[450px] gap-3 p-6 bg-gray-600"
    >
      <FlexBox direction="col" className="w-full h-fit gap-2">
        <FlexBox direction="row" className="w-full h-fit border-b-2">
          <div className="w-1/2 text-2xl pb-2 tracking-wider">
            {channel.title}
          </div>
          <div className="w-1/2 text-base tracking-wider text-right">
            {channel.type}
          </div>
        </FlexBox>
        <div className="w-full h-fit text-s">👑: owner 👤: admin</div>
      </FlexBox>
      <FlexBox direction="row" className="w-full h-full gap-6">
        <FlexBox direction="col" className="w-1/2 h-full gap-2 p-2 border">
          <div className="w-full h-fit p-1 text-xl border-b-2">Member</div>
          <ScrollBox className="max-h-[280px]">
            <FlexBox direction="col" className="w-full h-full gap-2 p-1">
              <div className="w-full h-fit">hello 👑</div>
              <div className="w-full h-fit">hello 👤</div>
              <div className="w-full h-fit">hello 👤</div>
              <div className="w-full h-fit">hello 👤</div>
              <div className="w-full h-fit">hello</div>
              <div className="w-full h-fit">hello</div>
              <div className="w-full h-fit">hello</div>
            </FlexBox>
          </ScrollBox>
        </FlexBox>
        <FlexBox direction="col" className="w-1/2 h-full gap-2 p-2 border">
          <div className="w-full h-fit p-1 text-xl border-b-2">
            Banned Member
          </div>
          <ScrollBox className="max-h-[280px]">
            <FlexBox direction="col" className="w-full h-full gap-2 p-1">
              {bannedList.map((_mem, idx) => {
                return (
                  <FlexBox
                    className="w-full h-fit justify-between"
                    key={idx}
                    direction="row"
                  >
                    <div className="w-fit h-fit">{_mem.nickname}</div>
                    {(chatInfo.role === "Owner" ||
                      chatInfo.role === "Admin") && (
                      // <CancelButton channel_id={channel.id} user_id={_mem.id} />
                      <button
                        onClick={async () => {
                          await removeBanMember(channel.id, _mem.id);
                          getData();
                        }}
                        className="text-xs font-bold px-2 py-1 border-[1.5px] border-deepred-cyber hover:bg-deepred-cyber hover:text-black"
                      >
                        X
                      </button>
                    )}
                  </FlexBox>
                );
              })}
            </FlexBox>
          </ScrollBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
