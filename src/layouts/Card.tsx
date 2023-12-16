interface Props {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
export default function Card({ children, onClick }: Props) {
  return (
    <div
      className="w-full h-full bg-card hover:drop-shadow-card p-12 rounded-lg"
      onClick={onClick}
    >
      {children}
    </div>
  );
}
