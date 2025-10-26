import { Metadata } from 'next'

export const siteMetadata: Metadata = {
  title: {
    default: 'DDS & TTS Tech Hive - Premier Tech Store in Accra, Ghana',
    template: '%s | DDS & TTS Tech Hive'
  },
  description: 'Leading tech store in Accra offering phones, laptops, gaming consoles, and professional repair services. Shop top brands like Apple, Samsung, Dell, and more.',
  keywords: ['tech store accra', 'ghana electronics', 'phone repair accra', 'laptop sales ghana', 'gaming consoles', 'apple products ghana', 'samsung ghana'],
  authors: [{ name: 'DDS & TTS Tech Hive' }],
  creator: 'DDS & TTS Tech Hive',
  publisher: 'DDS & TTS Tech Hive',
  metadataBase: new URL('https://ddsttstechhive.com'),
  openGraph: {
    type: 'website',
    locale: 'en_GH',
    url: 'https://ddsttstechhive.com',
    siteName: 'DDS & TTS Tech Hive',
    title: 'DDS & TTS Tech Hive - Premier Tech Store in Accra',
    description: 'Shop latest phones, laptops, gaming consoles and get expert repair services in Accra, Ghana.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DDS & TTS Tech Hive',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DDS & TTS Tech Hive - Premier Tech Store',
    description: 'Shop latest tech and get expert repairs in Accra, Ghana',
    images: ['/og-image.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
  },
}

// JSON-LD structured data for better SEO
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ElectronicsStore',
  name: 'DDS & TTS Tech Hive',
  description: 'Premier tech store in Accra, Ghana offering phones, laptops, gaming consoles, and repair services',
  url: 'https://ddsttstechhive.com',
  telephone: '+233-XX-XXX-XXXX',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Your Street Address',
    addressLocality: 'Accra',
    addressRegion: 'Greater Accra',
    addressCountry: 'GH',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '5.6037',
    longitude: '-0.1870',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '10:00',
      closes: '16:00',
    },
  ],
  priceRange: '₵₵₵',
}
