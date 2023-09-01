import "@/styles/globals.css";

export const metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <div className="max-w-screen-sm m-auto real-screen-height">
          {children}
        </div>
        <div id="portal"></div>
      </body>
    </html>
  );
}
