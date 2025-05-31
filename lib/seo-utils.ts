import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  section?: string
  tags?: string[]
}

export function generateMetadata({
  title = 'Shrinkily - Simplify Your Links',
  description = 'Shrinkily makes sharing easy with instant, reliable, and customized short URLs. Create short links, QR codes, and track analytics for your URL campaigns.',
  keywords = ['URL shortener', 'short links', 'QR codes', 'link analytics'],
  image = '/images/og-image.png',
  url = 'https://shrinkily.com',
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags,
}: SEOProps): Metadata {
  const baseUrl = 'https://shrinkily.com'
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`

  return {
    title,
    description,
    keywords,
    openGraph: {
      type,
      url: fullUrl,
      title,
      description,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
      ...(section && { section }),
      ...(tags && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [fullImageUrl],
      creator: '@shrinkily',
    },
    alternates: {
      canonical: fullUrl,
    },
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `https://shrinkily.com${item.url}`,
    })),
  }
}

export function generateArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
  url,
}: {
  title: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  authorName: string
  url: string
}) {
  return {
    '@type': 'Article',
    headline: title,
    description,
    image: image.startsWith('http') ? image : `https://shrinkily.com${image}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Shrinkily',
      logo: {
        '@type': 'ImageObject',
        url: 'https://shrinkily.com/images/logo.png',
      },
    },
    url: url.startsWith('http') ? url : `https://shrinkily.com${url}`,
  }
}
