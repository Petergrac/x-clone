import LeftPanel from "@/components/LeftPanel";
import "../globals.css";
import RightPanel from "@/components/RightPanel";
export default function XLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex w-screen h-screen justify-center">
      <LeftPanel />
      {children}
      <RightPanel />
    </main>
  );
}
