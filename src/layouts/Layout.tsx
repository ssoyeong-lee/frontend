import { Orbitron } from "next/font/google";
import { useModal } from "@/hooks/useModal";
import { useNotification } from "@/hooks/useNotification";
import { useToast } from "@/hooks/useToast";
import { useUserControl } from "@/hooks/useUserControl";
const orbitron = Orbitron({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const { modal } = useModal();
  const { notification } = useNotification();
  const { toast } = useToast();
  const { userControl } = useUserControl();
  return (
    <main className={`h-screen w-screen ${orbitron.className}`}>
      {modal}
      {notification}
      {toast}
      {userControl}
      {children}
    </main>
  );
}
