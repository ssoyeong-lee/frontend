import { inviteUser } from "@/api/channels/operate";
import { UserAbstract } from "@/api/users/index";
import ChipButton from "@/components/button/ChipButton";
import IconInput from "@/components/control/IconInput";
import useChatInfo from "@/hooks/data/useChatInfo";
import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";
import ScrollBox from "@/layouts/ScrollBox";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  userList?: UserAbstract[];
  isSearch?: boolean;
  setIsSearch?: (isSearch: boolean) => void;
}

function SearchItem({
  user,
  setIsSearch,
}: {
  user: UserAbstract;
  setIsSearch: (isSearch: boolean) => void;
}) {
  const router = useRouter();
  const { chatInfo } = useChatInfo();
  return (
    <FlexBox className="w-full px-4 py-2 justify-between">
      <div>{user.nickname}</div>
      <FlexBox className="gap-6">
        <ChipButton
          color="green"
          className="w-[80px]"
          onClick={async () => {
            try {
              chatInfo.selected &&
                chatInfo.selected.id !== null &&
                (await inviteUser(chatInfo.selected.id, user.id));
              setIsSearch(false);
            } catch (error) {
              const axiosError = error as AxiosError<{ message: string }>;
              if (axiosError.response?.status === 401) {
                router.push("/login");
                return;
              }
              if (typeof axiosError.response?.data.message === "object")
                toast.error(axiosError.response?.data.message[0]);
              else toast.error(axiosError.response?.data.message);
            }
          }}
        >
          invite
        </ChipButton>
      </FlexBox>
    </FlexBox>
  );
}

export default function SearchCard({
  userList,
  isSearch,
  setIsSearch,
  onClick,
}: Props) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isSearch) ref.current?.focus();
  }, [isSearch]);
  const [keyword, setKeyword] = useState("");
  const keyworkdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  return (
    <Card onClick={onClick}>
      <ScrollBox>
        <FlexBox direction="col" className="gap-6">
          <IconInput
            src="/icon/search.png"
            placeholder="type to search"
            color="red"
            value={keyword}
            onChange={keyworkdChange}
            ref={ref}
          />
          {isSearch &&
            setIsSearch &&
            userList &&
            userList
              .filter((user) => user.nickname.includes(keyword))
              .map((user) => {
                return (
                  <SearchItem
                    key={user.id}
                    user={user}
                    setIsSearch={setIsSearch}
                  />
                );
              })}
        </FlexBox>
      </ScrollBox>
    </Card>
  );
}
