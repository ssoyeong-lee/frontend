export default function NotificationDot({ amount }: { amount: number }) {
  if (amount === 0) return <></>;
  return (
    <div className="w-[20px] h-[20px] bg-deepred-cyber rounded-full text-black text-sm text-center font-bold pe-[1px]">
      {amount}
    </div>
  );
}
