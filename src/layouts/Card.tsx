interface Props {
  children: React.ReactNode;
}
export default function Card({ children }: Props) {
  return (
    <div className="w-full h-full bg-card hover:drop-shadow-card p-12 rounded-lg">
      {children}
    </div>
  );
}
