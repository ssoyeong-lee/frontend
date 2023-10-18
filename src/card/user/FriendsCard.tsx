import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";
import Icon from "@/layouts/Icon";

export default function FriendsCard() {
  return (
    <Card>
      <FlexBox className="h-full gap-8 text-xl" direction="col">
        <div>Friends</div>
        <FlexBox className="w-full justify-between">
          <div>hello</div>
          <Icon
            src="/icon/delete.png"
            alt="delete"
            className="w-[24px] h-[24px]"
          />
        </FlexBox>
        <FlexBox className="w-full justify-between">
          <div>hello</div>
          <FlexBox className="gap-4">
            <Icon
              src="/icon/check.png"
              alt="check"
              className="w-[24px] h-[24px]"
            />
            <Icon
              src="/icon/delete.png"
              alt="delete"
              className="w-[24px] h-[24px]"
            />
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Card>
  );
}
