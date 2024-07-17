export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
      <div className="h-full flex items-center justify-center bg-sky-600 from sky-400 to-blue-800">
        {children}
      </div>
  );
}
