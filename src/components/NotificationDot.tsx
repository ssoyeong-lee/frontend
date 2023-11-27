interface NotificationDotProps {
  amount: number;
  className?: string;
}
export default function NotificationDot({
  amount,
  className,
}: NotificationDotProps) {
  if (amount === -1)
    return (
      <div
        className={`w-[20px] h-[20px] bg-deepred-cyber rounded-full text-black text-sm text-center font-bold pe-[1px] ${className}`}
      ></div>
    );
  else if (amount === 0) return <></>;
  return (
    <div
      className={`w-[20px] h-[20px] bg-deepred-cyber rounded-full text-black text-sm text-center font-bold pe-[1px] ${className}`}
    >
      {amount}
    </div>
  );
}
