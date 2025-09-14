import "../globals.css";

export default function XLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="overflow-y-auto">{children}</main>;
}
