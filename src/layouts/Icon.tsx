import Image from "next/image";
import React from "react";

interface Props {
  onClick?: (() => void) | ((e: React.MouseEvent) => void);
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
