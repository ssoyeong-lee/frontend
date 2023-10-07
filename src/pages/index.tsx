import Image from "next/image";
import { Inter } from "next/font/google";
import FlexBox from "@/layouts/FlexBox";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <FlexBox className="h-screen justify-center">
        <div className="font-bold text-8xl text-center tracking-wider text-white">
          PONG<br></br>
          GAME
        </div>
    </FlexBox>

  );
}
