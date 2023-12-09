import React, { useEffect } from "react";
import Layout from "@/layouts/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useAuth } from "@/hooks/data/useAuth";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { auth } = useAuth();
  useEffect(() => {
    if (router.pathname !== "/" && router.pathname !== "/login") {
      if (!auth) {
        router.push("/login");
      }
    }
  }, [auth, router]); // TODO : test this
  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer />
    </Layout>
  );
}
