import { Block } from "@/api/users/block";
import FlexBox from "@/layouts/FlexBox";
import Icon from "@/layouts/Icon";

interface Props {
  block: Block;
  onClickDelete: (id: number) => void;
}

export default function BlockItem({ block, onClickDelete }: Props) {
  return (
    <FlexBox className="w-full justify-between">
      <div>{block.nickname}</div>
      <Icon
        src="/icon/delete.png"
        alt="delete"
        className="w-[24px] h-[24px] cursor-pointer"
        onClick={() => onClickDelete(block.id)}
      />
    </FlexBox>
  );
}
