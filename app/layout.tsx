import type { Metadata, Viewport } from 'next'
import { Geist_Mono, Inria_Sans } from 'next/font/google'
import { StructuredData } from '@/components/seo/structured-data'
import { LanguageProvider } from '@/providers/language-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import './globals.css'

const inriaSans = Inria_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://youngsolver.com'),
  title: {
    default: 'Young Solver | Solutions digitales',
    template: '%s | Young Solver',
  },
  description:
    'Young Solver conçoit des solutions digitales solides: developpement web, mobile, et produits sur mesure.',
  keywords: [
    'young solver',
    'developpement web',
    'agence digitale',
    'applications mobiles',
    'portfolio agence web',
  ],
  authors: [{ name: 'Young Solver' }],
  alternates: {
    canonical: '/',
    languages: {
      fr: '/',
      en: '/?lang=en',
    },
  },
  icons: {
    icon: '/images/favicon.png',
    shortcut: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
  openGraph: {
    title: 'Young Solver | Solutions digitales',
    description:
      'Developpement web, mobile, et experiences digitales concues pour durer.',
    url: 'https://youngsolver.com',
    siteName: 'Young Solver',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/logo-black.png',
        width: 1200,
        height: 630,
        alt: 'Young Solver',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Young Solver | Solutions digitales',
    description:
      'Developpement web, mobile, et experiences digitales concues pour durer.',
    images: ['/images/logo-black.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8F8F8' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inriaSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <StructuredData />
        <ThemeProvider
          attribute="class"
          defaultTheme="night"
          themes={['light', 'night', 'black', 'cyberpunk']}
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
