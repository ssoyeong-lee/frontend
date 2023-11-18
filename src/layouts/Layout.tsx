import { Orbitron } from "next/font/google";
import { ModalProvider } from "@/hooks/useModal";
import { NotificationProvider } from "@/hooks/useNotification";
import { ToastProvider } from "@/hooks/useToast";
import { UserControlProvider } from "@/hooks/useUserControl";
import { SocketProvider } from "@/hooks/useSocket";
const orbitron = Orbitron({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SocketProvider>
      <UserControlProvider>
        <ModalProvider>
          <ToastProvider>
            <NotificationProvider>
              <main className={`h-screen w-screen ${orbitron.className}`}>
                {children}
              </main>
            </NotificationProvider>
          </ToastProvider>
        </ModalProvider>
      </UserControlProvider>
    </SocketProvider>
  );
}
