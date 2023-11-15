import { ModalProvider } from "@/hooks/useModal";
import { NotificationProvider } from "@/hooks/useNotification";
import { ToastProvider } from "@/hooks/useToast";
import { UserControlProvider } from "@/hooks/useUserControl";
import Layout from "@/layouts/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserControlProvider>
      <ModalProvider>
        <ToastProvider>
          <NotificationProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NotificationProvider>
        </ToastProvider>
      </ModalProvider>
    </UserControlProvider>
  );
}
