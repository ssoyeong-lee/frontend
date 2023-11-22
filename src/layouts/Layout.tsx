import { Orbitron } from "next/font/google";
import { NotificationProvider } from "@/hooks/useNotification";
import { ToastProvider } from "@/hooks/useToast";
import { UserControlProvider } from "@/hooks/useUserControl";
import { SocketProvider } from "@/hooks/useSocket";
import { useModal } from "@/hooks/useModal";
const orbitron = Orbitron({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const {modal} = useModal();
  return (
    <SocketProvider>
      <UserControlProvider>
          <ToastProvider>
            <NotificationProvider>
              <main className={`h-screen w-screen ${orbitron.className}`}>
                {modal}
                {children}
              </main>
            </NotificationProvider>
          </ToastProvider>
      </UserControlProvider>
    </SocketProvider>
  );
}
