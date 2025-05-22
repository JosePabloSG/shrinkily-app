import type { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => ({
  title: "Acortador de enlaces gratis | Shrinkily - Acorta, comparte y gestiona tus links",
  description:
    "Shrinkily es el acortador de enlaces más fácil y rápido. Acorta URLs, comparte links personalizados y gestiona tus enlaces de forma segura y eficiente.",
  keywords: [
    "acortador de enlaces",
    "acortar links",
    "acortar URLs",
    "gestión de enlaces",
    "compartir links",
    "enlaces cortos",
    "shortener",
    "url shortener",
    "links personalizados",
    "Shrinkily"
  ],
  openGraph: {
    title: "Acortador de enlaces gratis | Shrinkily",
    description:
      "Acorta, comparte y gestiona tus enlaces fácilmente con Shrinkily. URLs cortas, seguras y personalizadas.",
    url: "https://shrinkily.com/",
    siteName: "Shrinkily",
    images: [
      {
        url: "/Logo.svg",
        width: 1200,
        height: 630,
        alt: "Shrinkily logo"
      }
    ],
    locale: "es_ES",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Acortador de enlaces gratis | Shrinkily",
    description:
      "Acorta, comparte y gestiona tus enlaces fácilmente con Shrinkily. URLs cortas, seguras y personalizadas.",
    images: ["/Logo.svg"]
  }
});
