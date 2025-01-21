import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import SessionAuthProvider from "@/providers/session-auth.provider";
import { cn } from "@/lib/utils";
import { calistoga, poppins } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Shrinkily - Simplify Your Links",
  description: "Shrinkily makes sharing easy with instant, reliable, and customized short URLs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          poppins.className,
          calistoga.variable,
          ' antialiased'
        )}>
        <SessionAuthProvider>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
          {children}
        </SessionAuthProvider>
      </body>
    </html>
  );
}
