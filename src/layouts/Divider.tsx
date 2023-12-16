export default function Divider({ color }: { color: "yellow" | "white" }) {
  const colorClass = color === "yellow" ? "bg-yellow-cyber" : "bg-white";
  return <div className={`w-full h-[1px] ${colorClass}`} />;
}
