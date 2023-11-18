import FlexBox from "@/layouts/FlexBox";
import ScrollBox from "@/layouts/ScrollBox";
import React from "react";

interface Props {
  nickname: React.ReactNode;
}

function UserNickname({ nickname }: Props) {
  return (
    <div className="w-full text-base tracking-wider font-bold">{nickname}</div>
  );
}

export default function BlockListModal() {
  return (
    <FlexBox
      direction="col"
      className="w-[300px] h-[300px] gap-6 p-6 bg-gray-600"
    >
      <div className="w-full border-solid border-b text-base tracking-wider font-bold">
        Blocked User List
      </div>
      <ScrollBox className="gap-6">
        <FlexBox direction="col" className="w-full gap-3 overflow-y-auto">
          <UserNickname nickname="user1" />
          <UserNickname nickname="user2" />
          <UserNickname nickname="user3" />
          <UserNickname nickname="user1" />
          <UserNickname nickname="user2" />
          <UserNickname nickname="user3" />
          <UserNickname nickname="user1" />
          <UserNickname nickname="user2" />
          <UserNickname nickname="user3" />
        </FlexBox>
      </ScrollBox>
    </FlexBox>
  );
}
