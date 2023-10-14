import MatchFoundModal from "@/components/modal/MatchFoundModal";
import useModal from "@/hooks/useModal";
import Layout from "@/layouts/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { Modal, modalOpen } = useModal();
  useEffect(() => {
    //modalOpen(<MatchFoundModal />);
  }, []);
  return (
    <Layout>
      <Component {...pageProps} />
      <Modal />
    </Layout>
  );
}
