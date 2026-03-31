export function StructuredData() {
  const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Young Solver',
    url: 'https://youngsolver.com',
    logo: 'https://youngsolver.com/images/logo-black.png',
    sameAs: [],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'contact@youngsolver.com',
        availableLanguage: ['French', 'English'],
      },
    ],
  }

  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Young Solver',
    url: 'https://youngsolver.com',
    inLanguage: ['fr', 'en'],
    potentialAction: {
      '@type': 'ContactAction',
      target: 'https://youngsolver.com/#contact',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
    </>
  )
}
