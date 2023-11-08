import ChipButton from "@/components/button/ChipButton";
import IconInput from "@/components/control/IconInput";
import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";
import { useEffect, useRef } from "react";

interface Props {
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isSearch?: boolean;
}

function SearchItem() {
  return (
    <FlexBox className="w-full px-4 py-2 justify-between">
      <div>seud</div>
      <FlexBox className="gap-6">
        <ChipButton color="green" className="w-[80px]">
          invite
        </ChipButton>
        <ChipButton color="red" className="w-[80px]">
          ban
        </ChipButton>
      </FlexBox>
    </FlexBox>
  );
}

export default function SearchCard({ isSearch, onClick }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isSearch) ref.current?.focus();
  }, [isSearch]);
  return (
    <Card onClick={onClick}>
      <FlexBox direction="col" className="gap-6">
        <IconInput
          src="/icon/search.png"
          placeholder="type to search"
          color="red"
          ref={ref}
        />
        {isSearch && (
          <>
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
          </>
        )}
      </FlexBox>
    </Card>
  );
}
