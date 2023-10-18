import IconInput from "@/components/control/IconInput";
import Card from "@/layouts/Card";

export default function SearchCard() {
  return (
    <Card>
      <IconInput
        src="/icon/search.png"
        placeholder="type to search"
        color="red"
      />
    </Card>
  );
}
