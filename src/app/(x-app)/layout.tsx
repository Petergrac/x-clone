import LeftBar from "@/components/LeftPanel";
import RightPanel from "@/components/RightPanel";

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex justify-center w-screen">
      <LeftBar />
        {children}
      <RightPanel/>
    </main>
  );
}
