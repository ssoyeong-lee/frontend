import Card from "@/layouts/Card";
import FlexBox from "@/layouts/FlexBox";

export default function QueueCard({
  queue,
  game,
}: {
  queue: number;
  game: number;
}) {
  return (
    <FlexBox className="w-full justify-center">
      <div className="text-xl font-bold tracking-wider">
        {`${queue} in queue / ${game} in games`}
      </div>
    </FlexBox>
  );
}
