import type { MetadataRoute } from 'next'
import { SITE_DESCRIPTION, SITE_NAME } from '@/content/site-config'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0A0A0A',
    theme_color: '#0A0A0A',
    lang: 'fr',
    categories: ['business', 'productivity', 'technology'],
    icons: [
      {
        src: '/images/favicon.png',
        type: 'image/png',
      },
      {
        src: '/images/logo-black.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/images/logo-white.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
