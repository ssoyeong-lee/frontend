import { Block, deleteBlock } from "@/api/users/block";
import BlockItem from "@/components/user/BlockItem";
import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";
import ScrollBox from "@/layouts/ScrollBox";

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
        <ScrollBox>
          <FlexBox className="gap-8" direction="col">
            {blockList.map((block, idx) => (
              <BlockItem
                block={block}
                onClickDelete={onClickDelete}
                key={idx}
              />
            ))}
          </FlexBox>
        </ScrollBox>
      </FlexBox>
    </Card>
  );
}
