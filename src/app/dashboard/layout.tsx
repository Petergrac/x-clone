import LeftBar from "@/components/LeftPanel";
import RightPanel from "@/components/RightPanel";

export default function XLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex w-screen min-h-screen justify-center">
      <LeftBar />
      <div className="md:w-150 w-full border-x-1 overflow-y-auto min-h-screen">
        {children}
      </div>
      <RightPanel/>
    </main>
  );
}
