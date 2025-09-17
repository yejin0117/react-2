export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <header>Root Layout Header</header>
        {children}
      <footer>Root Layout Footer</footer>
      </body>
    </html>
  );
}
