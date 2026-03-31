import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://youngsolver.com/sitemap.xml',
    host: 'https://youngsolver.com',
  }
}
