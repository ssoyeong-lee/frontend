import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// text-white  //items-center 
export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="content-center font-bold text-8xl text-center tracking-wider text-red-600">
        PONG<br></br>
        GAME
      </div>
    </div>
  );
}
