export default function XLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="md:w-150 w-full border-x-1 overflow-y-auto min-h-screen">
        {children}
      </div>

  );
}
