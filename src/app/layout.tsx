import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TempMail - Generate Temporary Email Address",
  description: "Create temporary disposable email addresses instantly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#f8fafc]`}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
