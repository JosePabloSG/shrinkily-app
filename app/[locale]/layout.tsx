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

export const metadata: Metadata = {
  title: "Shrinkily - Simplify Your Links",
  description: "Shrinkily makes sharing easy with instant, reliable, and customized short URLs.",
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
    <html lang="en">
      <body
        className={cn(
          poppins.className,
          calistoga.variable,
          ' antialiased'
        )}>
        <NextIntlClientProvider messages={messages}>
          <SessionAuthProvider>
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
