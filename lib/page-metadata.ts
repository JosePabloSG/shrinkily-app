import { Metadata } from 'next'

interface PageSEOProps {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  locale?: string
  alternateLocales?: string[]
}

export function generatePageMetadata({
  title,
  description,
  keywords = [],
  image = '/images/og-image.png',
  url = '',
  locale = 'en',
  alternateLocales = ['es']
}: PageSEOProps): Metadata {
  const baseUrl = 'https://shrinkily.com'
  const fullUrl = url ? `${baseUrl}/${locale}${url}` : `${baseUrl}/${locale}`
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`

  const alternates: Record<string, string> = {}
  alternateLocales.forEach(altLocale => {
    alternates[altLocale === 'en' ? 'en-US' : `${altLocale}-${altLocale.toUpperCase()}`] =
      url ? `${baseUrl}/${altLocale}${url}` : `${baseUrl}/${altLocale}`
  })

  return {
    title: `${title} | Shrinkily`,
    description,
    keywords: [...keywords, 'Shrinkily', 'URL shortener', 'short links'],
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      url: fullUrl,
      title: `${title} | Shrinkily`,
      description,
      siteName: 'Shrinkily',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Shrinkily`,
      description,
      images: [fullImageUrl],
      creator: '@shrinkily',
    },
    alternates: {
      canonical: fullUrl,
      languages: alternates,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

// Predefined page metadata
export const pageMetadata = {
  home: (locale: string) => generatePageMetadata({
    title: 'Simplify Your Links',
    description: 'Create short, custom URLs with QR codes and detailed analytics. Free URL shortener with advanced features.',
    keywords: ['free URL shortener', 'custom short links', 'QR code generator', 'link analytics'],
    locale,
  }),

  dashboard: (locale: string) => generatePageMetadata({
    title: 'Dashboard',
    description: 'Manage your short URLs, view analytics, and organize your links with tags.',
    keywords: ['dashboard', 'link management', 'URL analytics'],
    url: '/dashboard',
    locale,
  }),

  features: (locale: string) => generatePageMetadata({
    title: 'Features',
    description: 'Discover all Shrinkily features: custom domains, QR codes, analytics, bulk operations, and more.',
    keywords: ['URL shortener features', 'custom domains', 'QR codes', 'link analytics', 'bulk operations'],
    url: '/features',
    locale,
  }),

  about: (locale: string) => generatePageMetadata({
    title: 'About Us',
    description: 'Learn about Shrinkily and our mission to simplify link sharing for businesses and individuals.',
    keywords: ['about Shrinkily', 'company info', 'mission'],
    url: '/about',
    locale,
  }),

  contact: (locale: string) => generatePageMetadata({
    title: 'Contact Us',
    description: 'Get in touch with Shrinkily support team. We are here to help with your URL shortening needs.',
    keywords: ['contact support', 'help', 'customer service'],
    url: '/contact',
    locale,
  }),
}
