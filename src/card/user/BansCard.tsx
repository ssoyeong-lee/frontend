import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";
import Icon from "@/layouts/Icon";

export default function BansCard() {
  return (
    <Card>
      <FlexBox className="h-full gap-8 text-xl" direction="col">
        <div>Bans</div>
        <FlexBox className="w-full justify-between">
          <div>hello</div>
          <Icon
            src="/icon/delete.png"
            alt="delete"
            className="w-[24px] h-[24px]"
          />
        </FlexBox>
      </FlexBox>
    </Card>
  );
}
