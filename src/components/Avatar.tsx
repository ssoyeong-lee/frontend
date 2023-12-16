import Image from "next/image";

export const avatarObj = {
  0: "sample",
  1: "pingpong",
  2: "cat",
  3: "dog",
  4: "tiger",
};

interface Props {
  type: keyof typeof avatarObj;
}

export default function Avatar({ type }: Props) {
  return (
    <div className={`min-w-[80px] w-[80px] h-[80px]`}>
      <Image
        src={`/avatar/${avatarObj[type]}.jpg`}
        alt="avatar"
        width={80}
        height={80}
        className="rounded-full"
      />
    </div>
  );
}
