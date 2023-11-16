import { postBlock } from "@/api/users/block";
import { postRequestFriend } from "@/api/users/friend";
import { UserAbstract } from "@/api/users/index";
import ChipButton from "@/components/button/ChipButton";
import IconInput from "@/components/control/IconInput";
import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";
import ScrollBox from "@/layouts/ScrollBox";
import { useEffect, useRef, useState } from "react";

interface Props {
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  userList?: UserAbstract[];
  isSearch?: boolean;
}

function SearchItem({ user }: { user: UserAbstract }) {
  return (
    <FlexBox className="w-full px-4 py-2 justify-between">
      <div>{user.nickname}</div>
      <FlexBox className="gap-6">
        <ChipButton
          color="green"
          className="w-[80px]"
          onClick={async () => await postRequestFriend(user.id)}
        >
          invite
        </ChipButton>
        <ChipButton
          color="red"
          className="w-[80px]"
          onClick={async () => await postBlock(user.id)}
        >
          ban
        </ChipButton>
      </FlexBox>
    </FlexBox>
  );
}

export default function SearchCard({ userList, isSearch, onClick }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isSearch) ref.current?.focus();
  }, [isSearch]);
  const [keyword, setKeyword] = useState("");
  const keyworkdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }
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
            userList &&
            userList.map((user) => {
              return <SearchItem key={user.id} user={user} />;
            })}
        </FlexBox>
      </ScrollBox>
    </Card>
  );
}
