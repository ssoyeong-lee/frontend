import Image from "next/image";

export default function Avatar({ src }: { src: string }) {
  return (
    <div className="w-[100px] h-[100px]">
      <Image
        src={src}
        alt="avatar"
        width={100}
        height={100}
        className="rounded-full"
      />
    </div>
  );
}
