import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TempMail - Email Sementara Gratis | Buat Email Temporary",
  description: "Buat email sementara gratis dengan mudah dan cepat. Lindungi privasi Anda dengan email temporary. Tanpa registrasi, langsung pakai!",
  keywords: "email sementara, temporary email, email temporary, disposable email, email gratis, tempmail, temp mail, email sekali pakai, buat email sementara, email temporary indonesia, email disposable indonesia",
  authors: [{ name: "TempMail" }],
  creator: "TempMail",
  publisher: "TempMail",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "TempMail - Email Sementara Gratis | Buat Email Temporary",
    description: "Buat email sementara gratis dengan mudah dan cepat. Lindungi privasi Anda dengan email temporary. Tanpa registrasi, langsung pakai!",
    url: "https://tempmail-alpha.vercel.app",
    siteName: "TempMail",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "https://tempmail-alpha.vercel.app/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "TempMail - Email Sementara Gratis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TempMail - Email Sementara Gratis",
    description: "Buat email sementara gratis dengan mudah dan cepat. Lindungi privasi Anda dengan email temporary.",
    images: ["https://tempmail-alpha.vercel.app/images/og-image.webp"],
    creator: "@tempmail",
    site: "@tempmail",
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
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google-site-verification" content="googlea28ca0647bea5795" />
        <meta name="revisit-after" content="1 days" />
        <meta name="author" content="TempMail" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        <meta property="og:image" content="https://tempmail-alpha.vercel.app/images/og-image.webp" />
        <meta property="twitter:image" content="https://tempmail-alpha.vercel.app/images/og-image.webp" />
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
        <link rel="icon" type="image/webp" sizes="192x192" href="/images/icon-192.webp" />
        <link rel="icon" type="image/webp" sizes="512x512" href="/images/icon-512.webp" />
        <link rel="apple-touch-icon" href="/images/icon-180.webp" />
        <link rel="manifest" href="/manifest.json" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX`}
        />
        <Script
          id="google-analytics-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXX');
            `,
          }}
        />
        <Script
          id="adsense"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8085996511215136"
          crossOrigin="anonymous"
          strategy="afterInteractive"
          onError={(e) => {
            console.error('AdSense script failed to load', e);
          }}
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
