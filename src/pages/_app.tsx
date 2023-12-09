import React, { useEffect } from "react";
import Layout from "@/layouts/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSocket } from "@/hooks/useSocket";
import { useRouter } from "next/router";
import connectSocket from "@/socket/connectSocket";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { socket, setSocket } = useSocket();

  useEffect(() => {
    if (
      router.isReady &&
      !(
        router.pathname === "/login" ||
        router.pathname === "/register" ||
        router.pathname === "/"
      )
    ) {
      if (socket.connected === undefined) {
        const session = sessionStorage.getItem("session");
        const socketInstance = connectSocket(session ?? "");
        setSocket(socketInstance);
      }
    }
  }, [socket, router]);
  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer />
    </Layout>
  );
}
