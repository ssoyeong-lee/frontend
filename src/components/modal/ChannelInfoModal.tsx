import { MemberAbstract, MemberDetail, getChannel } from "@/api/channels";
import { depriveAdmin } from "@/api/channels/admin";
import { getBanMemberList, removeBanMember } from "@/api/channels/operate";
import useChatInfo, { ChannelInfoType } from "@/hooks/data/useChatInfo";
import FlexBox from "@/layouts/FlexBox";
import ScrollBox from "@/layouts/ScrollBox";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface MemItemProps {
  mem: MemberDetail;
  idx: number;
  channel: ChannelInfoType;
  getData: () => Promise<void>;
}
function MemberItem({ mem, idx, channel, getData }: MemItemProps) {
  const depriveAdminClick = async () => {
    try {
      await depriveAdmin(channel.id, mem.id);
      await getData();
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.status);
    }
  };
  return (
    <FlexBox className="w-full h-fit justify-between" key={idx} direction="row">
      <div className="w-fit h-fit">
        {mem.nickname}
        {mem.role === "Owner" && " 👑"}
        {mem.role === "Admin" && " 👤"}
      </div>
      {channel.role === "Owner" && mem.role === "Admin" && (
        <button
          onClick={depriveAdminClick}
          className="text-xs font-bold px-2 py-1 border-[1.5px] border-deepred-cyber hover:bg-deepred-cyber hover:text-black"
        >
          X
        </button>
      )}
    </FlexBox>
  );
}

interface BanItemProps {
  mem: MemberAbstract;
  idx: number;
  channel: ChannelInfoType;
  getData: () => Promise<void>;
}

function BanMemberItem({ mem, idx, channel, getData }: BanItemProps) {
  const removeBanClick = async () => {
    try {
      await removeBanMember(channel.id, mem.id);
      getData();
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.status);
    }
  };

  return (
    <FlexBox className="w-full h-fit justify-between" key={idx} direction="row">
      <div className="w-fit h-fit">{mem.nickname}</div>
      {(channel.role === "Owner" || channel.role === "Admin") && (
        <button
          onClick={removeBanClick}
          className="text-xs font-bold px-2 py-1 border-[1.5px] border-deepred-cyber hover:bg-deepred-cyber hover:text-black"
        >
          X
        </button>
      )}
    </FlexBox>
  );
}

export default function ChannelInfoModal() {
  const { chatInfo, updateInfo, updateMember } = useChatInfo();
  // const [memberList, setMemberList] = useState<MemberDetail[]>([]);
  const [bannedList, setBannedList] = useState<MemberAbstract[]>([]);

  useEffect(() => {
    if (chatInfo.selected !== null && chatInfo.selected.chatType === "CM") {
      getData();
    }
  }, []);

  if (chatInfo.selected === null || chatInfo.selected.chatType !== "CM") {
    console.log("error");
    return <></>;
  }

  const channel = chatInfo.selected;

  const getData = async () => {
    try {
      await updateInfo("CM");
      const bannedData = (await getBanMemberList(channel.id)).data;
      setBannedList(bannedData);
    } catch (error) {
      const AxiosError = error as AxiosError;
      toast.error(AxiosError.response?.status);
    }
  };

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
              {chatInfo.memberList !== null &&
                chatInfo.memberList.map((_mem, idx) => {
                  return (
                    <MemberItem
                      key={idx}
                      mem={_mem}
                      idx={idx}
                      channel={channel}
                      getData={async () => {
                        console.log("hello");
                      }}
                    />
                  );
                })}
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
                  <BanMemberItem
                    key={idx}
                    mem={_mem}
                    idx={idx}
                    channel={channel}
                    getData={getData}
                  />
                );
              })}
            </FlexBox>
          </ScrollBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
