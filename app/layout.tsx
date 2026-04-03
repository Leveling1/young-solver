import type { Metadata, Viewport } from 'next'
import { Geist_Mono, Inria_Sans } from 'next/font/google'
import { StructuredData } from '@/components/seo/structured-data'
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_LANGUAGE_ALTERNATES,
  SITE_NAME,
  SITE_SOCIAL_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from '@/content/site-config'
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
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [...SITE_KEYWORDS],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'technology',
  classification: 'Software development services',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: SITE_LANGUAGE_ALTERNATES,
  },
  icons: {
    icon: '/images/favicon.png',
    shortcut: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: SITE_TITLE,
    description: SITE_SOCIAL_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} social preview`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_SOCIAL_DESCRIPTION,
    images: ['/opengraph-image'],
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
          defaultTheme="system"
          themes={['light', 'black']}
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
