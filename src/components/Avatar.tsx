import Image from "next/image";

export default function Avatar({ src }: { src: string }) {
  return (
    <div className="min-w-[80px] w-[80px] h-[80px]">
      <Image
        src={src}
        alt="avatar"
        width={80}
        height={80}
        className="rounded-full"
      />
    </div>
  );
}
