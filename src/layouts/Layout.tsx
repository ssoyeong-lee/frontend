import { Orbitron } from "next/font/google";
import { useModal } from "@/hooks/display/useModal";
import { useUserControl } from "@/hooks/display/useUserControl";
const orbitron = Orbitron({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const { modal } = useModal();
  const { userControl } = useUserControl();
  return (
    <main className={`h-screen w-screen ${orbitron.className}`}>
      {modal}
      {userControl}
      {children}
    </main>
  );
}
