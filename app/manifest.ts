import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Young Solver',
    short_name: 'Young Solver',
    description: 'Solutions digitales, developpement web et mobile.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0A',
    theme_color: '#0A0A0A',
    icons: [
      {
        src: '/images/favicon.png',
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
