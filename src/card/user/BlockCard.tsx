import { Block } from "@/api/users/block";
import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";
import Icon from "@/layouts/Icon";

interface Props {
  blockList: Block[];
}

export default function BlockCard({ blockList }: Props) {
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
                className="w-[24px] h-[24px]"
              />
            </FlexBox>
          );
        })}
      </FlexBox>
    </Card>
  );
}
