import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TempMail - Email Sementara Gratis | Buat Email Temporary",
  description: "Buat email sementara gratis dengan mudah dan cepat. Lindungi privasi Anda dengan email temporary. Tanpa registrasi, langsung pakai!",
  keywords: "email sementara, temporary email, email temporary, disposable email, email gratis, tempmail, temp mail, email sekali pakai",
  authors: [{ name: "TempMail" }],
  openGraph: {
    title: "TempMail - Email Sementara Gratis | Buat Email Temporary",
    description: "Buat email sementara gratis dengan mudah dan cepat. Lindungi privasi Anda dengan email temporary. Tanpa registrasi, langsung pakai!",
    url: "https://tempmail-alpha.vercel.app",
    siteName: "TempMail",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TempMail - Email Sementara Gratis",
    description: "Buat email sementara gratis dengan mudah dan cepat. Lindungi privasi Anda dengan email temporary.",
  },
  verification: {
    google: "googlea28ca0647bea5795",
  },
  alternates: {
    canonical: "https://tempmail-alpha.vercel.app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google-site-verification" content="googlea28ca0647bea5795" />
        <link rel="icon" href="/favicon.ico" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8085996511215136"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.className} bg-[#f8fafc]`}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
