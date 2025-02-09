import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AdSenseWrapper from '@/components/AdSenseWrapper';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://tempmail.blogspot.com'),
  title: "TempMail - Free Temporary Email | Create Disposable Email",
  description: "Create free temporary email quickly and easily. Protect your privacy from spam. No registration required, instant access!",
  keywords: "temporary email, disposable email, temp mail, free email, tempmail, temporary mail, disposable mail, one-time email, free temporary email, temporary email no registration, anonymous email",
  authors: [{ name: "TempMail" }],
  creator: "TempMail",
  publisher: "TempMail",
  applicationName: "TempMail",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon',
        url: '/icon-192.png',
      },
    ],
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "TempMail - Free Temporary Email | Create Disposable Email",
    description: "Create free temporary email quickly and easily. Protect your privacy from spam. No registration required, instant access!",
    url: "https://tempmail.blogspot.com",
    siteName: "TempMail",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://tempmail.blogspot.com/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "TempMail - Free Temporary Email Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TempMail - Free Temporary Email",
    description: "Create free temporary email quickly and easily. Protect your privacy from spam.",
    images: ["https://tempmail.blogspot.com/images/og-image.webp"],
    creator: "@tempmail",
    site: "@tempmail",
  },
  verification: {
    google: "googlea28ca0647bea5795",
  },
  alternates: {
    canonical: "https://tempmail.blogspot.com",
    languages: {
      'en-US': 'https://tempmail.blogspot.com',
    },
  },
  category: 'technology',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google-site-verification" content="googlea28ca0647bea5795" />
        <meta name="revisit-after" content="1 days" />
        <meta name="author" content="TempMail" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        <meta property="og:image" content="https://tempmail.blogspot.com/images/og-image.webp" />
        <meta property="twitter:image" content="https://tempmail.blogspot.com/images/og-image.webp" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Schema.org markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "TempMail - Free Temporary Email",
              "url": "https://tempmail.blogspot.com",
              "description": "Create free temporary email quickly and easily. Protect your privacy from spam. No registration required, instant access!",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Free temporary email",
                "No registration required",
                "Privacy protection",
                "Easy to use",
                "Instant access",
                "Spam protection"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} bg-[#f8fafc]`}>
        <main className="min-h-screen">
          {children}
        </main>
        <AdSenseWrapper />
      </body>
    </html>
  );
}
