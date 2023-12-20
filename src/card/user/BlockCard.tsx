import { deleteBlock } from "@/api/users/block";
import { OtherUserAbstract } from "@/api/users/index";
import BlockItem from "@/components/user/BlockItem";
import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";
import ScrollBox from "@/layouts/ScrollBox";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface Props {
  blockList: OtherUserAbstract[];
  setBlockList: (blockList: OtherUserAbstract[]) => void;
}

export default function BlockCard({ blockList, setBlockList }: Props) {
  const router = useRouter();
  const onClickDelete = async (id: number) => {
    try {
      await deleteBlock(id);
      setBlockList(blockList.filter((block) => block.id !== id));
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
