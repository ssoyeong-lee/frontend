import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={`h-screen w-screen ${orbitron.className}`}>
      {children}
    </main>
  );
}
