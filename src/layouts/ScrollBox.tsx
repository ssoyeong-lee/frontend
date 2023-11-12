interface Props {
  children: React.ReactNode;
  className?: string;
  props?: any;
}
export default function ScrollBox({ children, className, ...props }: Props) {
  return (
    <div
      id="scroll-box"
      className={`w-full h-full overflow-y-auto overflow-x-hidden pr-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
