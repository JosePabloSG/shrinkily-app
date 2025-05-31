import { WebSite, Organization, SoftwareApplication } from 'schema-dts'

export const organizationSchema: Organization = {
  '@type': 'Organization',
  name: 'Shrinkily',
  url: 'https://shrinkily.com',
  logo: 'https://shrinkily.com/images/logo.png',
  sameAs: [
    'https://twitter.com/shrinkily',
    'https://github.com/shrinkily',
  ],
  description: 'Shrinkily makes sharing easy with instant, reliable, and customized short URLs',
  foundingDate: '2024',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    url: 'https://shrinkily.com/contact',
  },
}

export const websiteSchema: WebSite = {
  '@type': 'WebSite',
  name: 'Shrinkily',
  url: 'https://shrinkily.com',
  description: 'Shrinkily makes sharing easy with instant, reliable, and customized short URLs',
  inLanguage: ['en', 'es'],
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://shrinkily.com/search?q={search_term_string}',
  },
}

export const softwareApplicationSchema: SoftwareApplication = {
  '@type': 'SoftwareApplication',
  name: 'Shrinkily',
  description: 'URL shortener and link management platform',
  url: 'https://shrinkily.com',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  author: organizationSchema,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '150',
    bestRating: '5',
    worstRating: '1',
  },
}
