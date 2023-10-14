import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";
import Icon from "@/layouts/Icon";

export default function SearchCard() {
  return (
    <Card>
      <div className="relative">
        <div className="w-full h-[55px]"></div>
        <div className="h-full absolute z-1 top-0 right-0 text-end">
          <FlexBox className="justify-end pe-4 h-full">
            <Icon
              src="/icon/search.png"
              className="w-[30px] h-[30px]"
              alt="search"
            />
          </FlexBox>
        </div>
        <input
          className="w-full h-full absolute z-99 top-0 text-xl px-4 bg-[#00000000] border border-deepred-cyber"
          placeholder="type to search"
        />
      </div>
    </Card>
  );
}
