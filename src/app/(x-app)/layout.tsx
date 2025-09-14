import "../globals.css";

export default function XLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="md:w-150 w-90 border-x-1 overflow-y-auto min-h-screen">{children}</main>;
}
