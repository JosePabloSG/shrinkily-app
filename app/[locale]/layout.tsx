import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import SessionAuthProvider from "@/providers/session-auth.provider";
import { cn } from "@/lib/utils";
import { calistoga, poppins } from "@/lib/fonts";
import { organizationSchema, websiteSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    default: "Shrinkily - Simplify Your Links",
    template: "%s | Shrinkily"
  },
  description: "Shrinkily makes sharing easy with instant, reliable, and customized short URLs. Create short links, QR codes, and track analytics for your URL campaigns.",
  keywords: ["URL shortener", "short links", "QR codes", "link analytics", "custom URLs", "link management", "link tracking"],
  authors: [{ name: "Shrinkily Team" }],
  creator: "Shrinkily",
  publisher: "Shrinkily",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://shrinkily.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'es-ES': '/es',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shrinkily.com',
    title: 'Shrinkily - Simplify Your Links',
    description: 'Shrinkily makes sharing easy with instant, reliable, and customized short URLs. Create short links, QR codes, and track analytics for your URL campaigns.',
    siteName: 'Shrinkily',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Shrinkily - URL Shortener',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shrinkily - Simplify Your Links',
    description: 'Shrinkily makes sharing easy with instant, reliable, and customized short URLs. Create short links, QR codes, and track analytics for your URL campaigns.',
    creator: '@shrinkily',
    images: ['/images/twitter-image.png'],
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: any
}>) {
  const { locale } = params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={cn(
          poppins.className,
          calistoga.variable,
          ' antialiased'
        )}>
        <NextIntlClientProvider messages={messages}>
          <SessionAuthProvider>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@graph': [organizationSchema, websiteSchema]
                })
              }}
            />
            <Toaster
              position="top-center"
              reverseOrder={false}
            />
            {children}
          </SessionAuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
