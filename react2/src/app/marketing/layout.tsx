export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <header>Root Marketing Header</header>
        {children}
      <footer>Root Marketing Header</footer>
      </body>
    </html>
  );
}
