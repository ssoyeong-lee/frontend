import FlexBox from "./FlexBox";

export default function LogoBox() {
  return (
    <FlexBox className="h-full w-full justify-center">
      <div className="font-bold text-8xl tracking-wider text-white">
        PONG
        <br />
        GAME
      </div>
    </FlexBox>
  );
}
