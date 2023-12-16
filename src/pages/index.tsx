import LogoBox from "@/layouts/LogoBox";
import sleep from "@/utils/sleep";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const redirect = async () => {
      await sleep(1000);
      router.push("/login");
    };
    redirect();
  }, []);
  return <LogoBox />;
}
