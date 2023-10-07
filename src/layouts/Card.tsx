interface Props {
  children: React.ReactNode;
}
export default function Card({ children }: Props) {
  return <div className="bg-card hover:drop-shadow-card p-6">{children}</div>;
}
