interface Props {
  children: React.ReactNode;
  className?: string;
}
export default function ModalCard({ children, className }: Props) {
  return (
    <div
      className={`bg-gray-700 px-6 py-12 border-[1.5px] border-white ${className}`}
    >
      {children}
    </div>
  );
}
