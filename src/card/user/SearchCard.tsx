import IconInput from "@/components/control/IconInput";
import Card from "@/layouts/Card";
import { useEffect, useRef } from "react";

interface Props {
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  isSearch?: boolean;
}

export default function SearchCard({ isSearch, onClick }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    console.log(ref);
    ref.current?.focus();
  }, []);
  return (
    <Card onClick={onClick}>
      <IconInput
        src="/icon/search.png"
        placeholder="type to search"
        color="red"
        ref={ref}
      />
    </Card>
  );
}
