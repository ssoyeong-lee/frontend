import { TFASetup } from "@/api/auth/2fa";
import { UserDetail, putUserMe } from "@/api/users/index";
import Avatar, { avatarObj } from "@/components/Avatar";
import ChipButton from "@/components/button/ChipButton";
import DefaultInput from "@/components/control/DefaultInput";
import AvatarModal from "@/components/modal/AvatarModal";
import TFAModal from "@/components/modal/TFAModal";
import { useModal } from "@/hooks/display/useModal";
import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";
import { Dispatch, SetStateAction } from "react";

interface Props {
  user: UserDetail | null;
  setUser?: Dispatch<SetStateAction<UserDetail | null>>;
  type: "me" | "other";
}

export default function ProfileCard({ type, user, setUser }: Props) {
  const { openModal, closeModal } = useModal();
  const onChange = (key: keyof UserDetail, value: any) => {
    if (!setUser || !user) return;
    setUser((prev: UserDetail | null) => {
      if (!prev) return null;
      return { ...prev, [key]: value };
    });
  };
  const onCloseAvatar = (num: keyof typeof avatarObj) => {
    closeModal();
    if (!setUser || !user) return;
    setUser((prev: UserDetail | null) => {
      if (!prev) return null;
      putUserMe({ ...prev, avatar: num });
      return { ...prev, avatar: num };
    });
  };
  const onClickAvatar = () => {
    if (type === "other") return;
    if (!setUser || !user) return;
    openModal(<AvatarModal onClick={onCloseAvatar} />);
  };
  const onClickTwoFactor = async () => {
    openModal(<TFAModal />);
  };
  const onBlur = async () => {
    if (!user) return;
    await putUserMe(user);
  };

  return (
    <Card>
      <FlexBox className="w-full gap-6" direction="col">
        <FlexBox className="w-full justify-between">
          <div className="text-2xl font-bold">Status</div>
          <div className="text-2xl font-bold text-green-cyber">online</div>
        </FlexBox>
        <FlexBox className="w-full justify-between gap-6">
          <div>
            {type === "other" ? (
              <div className="text-5xl font-bold">{user?.nickname}</div>
            ) : (
              <DefaultInput
                className="text-2xl py-2 bg-gray-700"
                value={user?.nickname}
                onChange={(e) => onChange("nickname", e.target.value)}
                onBlur={onBlur}
              />
            )}
            <div className="mt-2 text-gray-300 font-bold">{user?.email}</div>
          </div>
          <div className="relative">
            <Avatar type={user?.avatar ?? 0} />
            {type === "me" && (
              <FlexBox
                direction="col"
                className="group/item absolute cursor-pointer rounded-full hover:bg-[#000000CC] 
                top-0 right-0 h-full w-full justify-center text-white"
                onClick={onClickAvatar}
              >
                <div className="text-sm invisible group-hover/item:visible">
                  change
                </div>
              </FlexBox>
            )}
          </div>
        </FlexBox>
        {type === "other" ? (
          <div className="w-full text-gray-300">{user?.bio}</div>
        ) : (
          <>
            <DefaultInput
              className="text-md py-1 bg-gray-700"
              value={user?.bio ?? ""}
              onChange={(e) => onChange("bio", e.target.value)}
              onBlur={onBlur}
            />
            <FlexBox className="w-full justify-between">
              <div className="font-bold">2 factor auth</div>
              <ChipButton color="white" onClick={onClickTwoFactor}>
                {user ? "ON" : "OFF"}
              </ChipButton>
            </FlexBox>
          </>
        )}
      </FlexBox>
    </Card>
  );
}
