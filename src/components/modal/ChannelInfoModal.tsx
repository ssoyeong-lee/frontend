import { getChannel } from "@/api/channels";
import FlexBox from "@/layouts/FlexBox";
import ScrollBox from "@/layouts/ScrollBox";
import { useEffect, useState } from "react";

export default  function ChannelInfoModal(){
  return (
    <FlexBox
      direction="col"
      className="w-[600px] h-[450px] gap-3 p-6 bg-gray-600"
    >
      <FlexBox direction="col" className="w-full h-fit gap-2">
        <FlexBox direction="row" className="w-full h-fit border-b-2">
          <div className="w-1/2 text-2xl pb-2 tracking-wider">channel name</div>
          <div className="w-1/2 text-base tracking-wider text-right">public</div>
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
          <div className="w-full h-fit p-1 text-xl border-b-2">Banned Member</div>
          <ScrollBox className="max-h-[280px]">
            <FlexBox direction="col" className="w-full h-full gap-2 p-1">     
              <div className="w-full h-fit">hello</div>
              <div className="w-full h-fit">hello</div>
              <div className="w-full h-fit">hello</div>
            </FlexBox>
          </ScrollBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}