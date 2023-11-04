import FlexBox from "@/layouts/FlexBox";
import DefaultInput from "../control/DefaultInput";
import SquareButton from "../button/SquareButton";

export default function ChatroomSettinngModal() {
  
  return (
    <FlexBox direction="col" className="w-[300px] h-[300px] gap-6 p-6 text-base tracking-wider bg-gray-600">
      <div className="font-bold">Change Password</div>
      <FlexBox direction="col" className="w-full h-full gap-3">
        <DefaultInput placeholder="new" className="bg-gray-700"/>
        <DefaultInput placeholder="again" className="bg-gray-700"/>
      </FlexBox>
      <FlexBox className="w-full justify-end">
        <SquareButton className="w-[150px]">Ok</SquareButton>
      </FlexBox>
    </FlexBox>
  );
}
