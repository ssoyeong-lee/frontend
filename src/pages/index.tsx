import { useAuth } from "@/hooks/useAuth";
import LogoBox from "@/layouts/LogoBox";
import sleep from "@/utils/sleep";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { username } = useAuth();
  const router = useRouter();
  useEffect(() => {
    const redirect = async () => {
      await sleep(1000);
      if (username === "") {
        router.push("/login");
      } else {
        router.push("/main");
      }
    };
    redirect();
  }, []);
  return <LogoBox />;
}
