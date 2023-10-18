interface Props {
  children: React.ReactNode;
}

export default function Container({ children }: Props) {
  return <div className="p-6 h-[calc(100%-120px)]">{children}</div>;
}
