import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shelf — A world of books, right on your Shelf",
  description:
    "Shelf is a modern digital library. Discover public-domain classics, read online, and track your reading — completely free.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-paper text-ink font-sans">
        {children}
      </body>
    </html>
  );
}
