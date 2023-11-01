import { AuthProvider } from "@/hooks/useAuth";
import { ModalProvider } from "@/hooks/useModal";
import { ToastProvider } from "@/hooks/useToast";
import Layout from "@/layouts/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ModalProvider>
        <ToastProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ToastProvider>
      </ModalProvider>
    </AuthProvider>
  );
}
