import {
  BUSINESS_CONTACT,
  BUSINESS_LOCATION,
  DELIVERY_CAPABILITIES,
  SERVICE_OFFER_NAMES,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_SOCIAL_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from '@/content/site-config'

const organizationId = `${SITE_URL}/#organization`
const websiteId = `${SITE_URL}/#website`
const webpageId = `${SITE_URL}/#webpage`
const serviceId = `${SITE_URL}/#services`

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo-black.png`,
      description: SITE_DESCRIPTION,
      email: BUSINESS_CONTACT.email,
      telephone: BUSINESS_CONTACT.phone,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: BUSINESS_CONTACT.email,
          telephone: BUSINESS_CONTACT.phone,
          availableLanguage: ['fr', 'en'],
        },
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: BUSINESS_LOCATION.city,
        addressRegion: BUSINESS_LOCATION.region,
        addressCountry: BUSINESS_LOCATION.countryCode,
      },
      areaServed: [
        {
          '@type': 'Country',
          name: BUSINESS_LOCATION.countryName,
        },
        'Remote',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_SOCIAL_DESCRIPTION,
      inLanguage: ['fr', 'en'],
      publisher: {
        '@id': organizationId,
      },
    },
    {
      '@type': 'WebPage',
      '@id': webpageId,
      url: SITE_URL,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      isPartOf: {
        '@id': websiteId,
      },
      about: {
        '@id': organizationId,
      },
      primaryImageOfPage: `${SITE_URL}/opengraph-image`,
      inLanguage: 'fr',
    },
    {
      '@type': 'ProfessionalService',
      '@id': serviceId,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_SOCIAL_DESCRIPTION,
      provider: {
        '@id': organizationId,
      },
      serviceType: [...SERVICE_OFFER_NAMES],
      knowsAbout: [...DELIVERY_CAPABILITIES],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services Young Solver',
        itemListElement: SERVICE_OFFER_NAMES.map((serviceName, index) => ({
          '@type': 'Offer',
          position: index + 1,
          itemOffered: {
            '@type': 'Service',
            name: serviceName,
          },
        })),
      },
    },
  ],
}

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
