import { Block, deleteBlock } from "@/api/users/block";
import BlockItem from "@/components/user/BlockItem";
import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";

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
        {blockList.map((block, idx) => (
          <BlockItem block={block} onClickDelete={onClickDelete} key={idx} />
        ))}
      </FlexBox>
    </Card>
  );
}
