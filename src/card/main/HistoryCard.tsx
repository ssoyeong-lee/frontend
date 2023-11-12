import Card from "@/layouts/Card";
import Divider from "@/layouts/Divider";
import FlexBox from "@/layouts/FlexBox";
import ScrollBox from "@/layouts/ScrollBox";

const templateHistory = [
  {
    date: "22-09-2021 21:00:32",
    opposite: "ryou73",
    type: "Ladder",
    score: "5:3",
    outcome: "Win",
    ladder: "+30",
  },
  {
    date: "22-09-2021 21:00:32",
    opposite: "ryou73",
    type: "Ladder",
    score: "5:3",
    outcome: "Win",
    ladder: "+30",
  },
  {
    date: "22-09-2021 21:00:32",
    opposite: "ryou73",
    type: "Ladder",
    score: "5:3",
    outcome: "Win",
    ladder: "+30",
  },
  {
    date: "22-09-2021 21:00:32",
    opposite: "ryou73",
    type: "Ladder",
    score: "5:3",
    outcome: "Win",
    ladder: "+30",
  },
  {
    date: "22-09-2021 21:00:32",
    opposite: "ryou73",
    type: "Ladder",
    score: "5:3",
    outcome: "Win",
    ladder: "+30",
  },
  {
    date: "22-09-2021 21:00:32",
    opposite: "ryou73",
    type: "Ladder",
    score: "5:3",
    outcome: "Win",
    ladder: "+30",
  },
  {
    date: "22-09-2021 21:00:32",
    opposite: "ryou73",
    type: "Ladder",
    score: "5:3",
    outcome: "Win",
    ladder: "+30",
  },
  {
    date: "22-09-2021 21:00:32",
    opposite: "ryou73",
    type: "Ladder",
    score: "5:3",
    outcome: "Win",
    ladder: "+30",
  },
];

export default function HistoryCard() {
  return (
    <Card>
      <FlexBox className="w-full max-h-full text-center gap-4" direction="col">
        <FlexBox className="w-full justify-between">
          <div className="w-2/12 text-start">Date</div>
          <div className="w-1/12">Opposite</div>
          <div className="w-1/12">Type</div>
          <div className="w-1/12">Score</div>
          <div className="w-1/12">Outcome</div>
          <div className="w-1/12">Ladder</div>
        </FlexBox>
        <Divider color="white" />
        <ScrollBox className="flex-1">
          {templateHistory.map((history, idx) => (
            <FlexBox className="w-full justify-between" key={idx}>
              <div className="w-2/12 text-start">{history.date}</div>
              <div className="w-1/12">{history.opposite}</div>
              <div className="w-1/12">{history.type}</div>
              <div className="w-1/12">{history.score}</div>
              <div className="w-1/12">{history.outcome}</div>
              <div className="w-1/12">{history.ladder}</div>
            </FlexBox>
          ))}
        </ScrollBox>
      </FlexBox>
    </Card>
  );
}
