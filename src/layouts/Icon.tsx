import Image from "next/image";

interface Props {
  onClick?: () => void;
  className?: string;
  src: string;
  alt: string;
}

export default function Icon({ onClick, className, src, alt }: Props) {
  return (
    <Image
      onClick={onClick}
      className={className}
      src={src}
      alt={alt}
      width={48}
      height={48}
    />
  );
}
