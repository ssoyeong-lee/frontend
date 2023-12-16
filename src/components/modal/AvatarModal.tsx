import Avatar, { avatarObj } from "@/components/Avatar";
import FlexBox from "@/layouts/FlexBox";
import ModalCard from "@/layouts/ModalCard";
import React from "react";

interface Props {
  onClick: (type: keyof typeof avatarObj) => void;
}
export default function AvatarModal({ onClick }: Props) {
  return (
    <ModalCard>
      <FlexBox className="gap-8 px-4">
        {Object.keys(avatarObj).map((value, idx) => {
          const type = parseInt(value) as keyof typeof avatarObj;
          return (
            <div
              key={idx}
              className="cursor-pointer"
              onClick={() => onClick(type)}
            >
              <Avatar type={type} />
            </div>
          );
        })}
      </FlexBox>
    </ModalCard>
  );
}
