import IconInput from "@/components/control/IconInput";
import Card from "@/layouts/Card";

export default function SearchCard() {
  return (
    <Card>
      <IconInput
        src="/icon/search.png"
        placeholder="type to search"
        className="border border-deepred-cyber"
      />
    </Card>
  );
}
