import { Block, deleteBlock } from "@/api/users/block";
import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";
import Icon from "@/layouts/Icon";

interface Props {
  blockList: Block[];
  setBlockList: (blockList: Block[]) => void;
}

export default function BlockCard({ blockList, setBlockList }: Props) {
  const onClickDelete = async (id: number) => {
    await deleteBlock(id);
    setBlockList(blockList.filter((block) => block.id !== id));
  };
  return (
    <Card>
      <FlexBox className="h-full gap-8 text-xl" direction="col">
        <div>Blocks</div>
        {blockList.map((block, idx) => {
          return (
            <FlexBox className="w-full justify-between" key={idx}>
              <div>{block.nickname}</div>
              <Icon
                src="/icon/delete.png"
                alt="delete"
                className="w-[24px] h-[24px] cursor-pointer"
                onClick={() => onClickDelete(block.id)}
              />
            </FlexBox>
          );
        })}
      </FlexBox>
    </Card>
  );
}
